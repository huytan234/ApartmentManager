from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, parsers, permissions, status
from rest_framework.permissions import IsAuthenticated
from . import serializers, paginators, perms
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Service, ResidentFamily, Feedback, Bill, Survey, SurveyAnswer, TuDo, Package, \
    SurveyQuestion, Notification
from .serializers import PackageSerializer, ResidentFamilySerializer, SurveySerializer


class UserViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action in ['get_current_user', 'set_active', 'delete_user']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='current-user', detail=False)
    def get_current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()
        return Response(serializers.UserSerializer(user).data)

    @action(methods=['patch'], url_path='update-current-user', detail=True)
    def update_current_user(self, request, pk=None):
        user = request.user
        serializer = serializers.UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @action(methods=['post'], detail=False, url_path='add-user')
    def add_user(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response(serializers.UserSerializer(user).data, status=status.HTTP_201_CREATED)

    @action(methods=['delete'], url_path='delete-user', detail=True)
    def delete_user(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except User.DoesNotExist:
            return Response({"detail": "Không có người dùng nào khớp với truy vấn đã cho."},
                            status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=True, url_path='register-access-card')
    def register_access_card(self, request, pk):
        name = request.data.get('name')
        cccd = request.data.get('cccd')
        sdt = request.data.get('sdt')
        relationship = request.data.get('relationship')
        resident_family = ResidentFamily.objects.create(name=name, cccd=cccd, sdt=sdt, relationship=relationship, user=request.user)
        return Response(serializers.ResidentFamilySerializer(resident_family).data, status=status.HTTP_201_CREATED)


class ServiceViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = serializers.ServiceSerializer

    @action(methods=['post'], detail=False, url_path='add-service')
    def add_service(self, request):
        name = request.data.get('name')
        description = request.data.get('description')
        price = request.data.get('price')
        f = Service.objects.create(name=name, description=description, price=price)
        return Response(serializers.ServiceSerializer(f).data, status=status.HTTP_201_CREATED)

    # @action(methods=['post'], detail=True, url_path='register-service')
    # def register_service(self, request):
    #     name = request.data.get('name')


class ResidentFamilyViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ResidentFamily.objects.all()
    serializer_class = serializers.ResidentFamilySerializer

    # Update trạng thái thẻ
    @action(methods=['patch'], detail=True, url_path='update-family-status')
    def update_family_status(self, request, pk=None):
        try:
            # Tìm thành viên gia đình qua pk (id của thành viên gia đình)
            family_member = ResidentFamily.objects.get(id=pk)
        except ResidentFamily.DoesNotExist:
            return Response({"error": "Family member not found"}, status=status.HTTP_404_NOT_FOUND)

        # Cập nhật status sang giá trị 'pass' (giả sử giá trị là 1)
        family_member.status = 1
        family_member.save()

        return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)


class BillViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Bill.objects.all()
    serializer_class = serializers.BillSerializer

    @action(methods=['post'], detail=False, url_path='add-bills')
    def add_bill(self, request):
        serializer = serializers.BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], url_path='update-bill', detail=True, permission_classes = [IsAuthenticated])
    def update_bill(self, request, pk=None):
        try:
            bill = Bill.objects.get(id=pk)  # Lấy hóa đơn theo ID
        except Bill.DoesNotExist:
            return Response({"error": "Bill not found"}, status=status.HTTP_404_NOT_FOUND)

        # Sử dụng request.user để đảm bảo quyền sở hữu hóa đơn
        if bill.user != request.user:
            return Response({"error": "You do not have permission to update this bill"}, status=status.HTTP_403_FORBIDDEN)

        # Tạo dữ liệu mới từ request chỉ bao gồm các trường cần cập nhật
        update_data = {}

        if 'payment_method' in request.data:
            update_data['payment_method'] = request.data['payment_method']

        if 'bill_image' in request.data:
            update_data['bill_image'] = request.data['bill_image']

        # Cập nhật trạng thái đã thanh toán
        update_data['status'] = 1  # Giả định status = 1 là đã thanh toán

        # Serialize và cập nhật bill
        serializer = serializers.BillSerializer(bill, data=update_data, partial=True)  # partial=True cho phép cập nhật một phần dữ liệu
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['delete'], detail=True, url_path='delete-bill')
    def delete_paid_bill(self, request, pk=None):
        try:
            bill = Bill.objects.get(id=pk)  # Tìm hóa đơn theo ID
        except Bill.DoesNotExist:
            return Response({"error": "Bill not found"}, status=status.HTTP_404_NOT_FOUND)

        # Kiểm tra xem hóa đơn đã được thanh toán chưa
        if bill.status == 1:  # Giả sử status = 1 là đã thanh toán
            bill.delete()
            return Response({"message": "Bill deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Bill has not been paid yet"}, status=status.HTTP_400_BAD_REQUEST)


class TuDoViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = TuDo.objects.all()
    serializer_class = serializers.TuDoSerializer

    def get_permissions(self):
        if self.action == 'add_package':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], url_path='add-TuDo', detail=False)
    def add_tudo(self, request, pk=None):
        name = request.data.get('name')
        f = TuDo.objects.create(name=name)
        return Response(serializers.TuDoSerializer(f).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='add-Packages', detail=True)
    def add_packages(self, request, pk=None):
        tuDo=self.get_object()
        name=request.data.get('name')
        package_status=request.data.get('status')
        f = Package.objects.create(name=name, tuDo=tuDo, status= package_status)
        return Response(serializers.PackageSerializer(f).data, status=status.HTTP_201_CREATED)

    # @action(detail=True, methods=['delete'], url_path='delete-package/(?P<package_id>[^/.]+)')
    # def delete_package(self, request, pk=None, package_id=None):
    #     try:
    #         # Lấy tủ đồ theo ID
    #         tudo = self.get_object()
    #
    #         # Lấy món hàng từ tủ đồ theo package_id
    #         package = tudo.package.get(id=package_id)
    #
    #         # Xóa món hàng
    #         package.delete()
    #
    #         return Response({"message": "Package deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    #
    #     except Package.DoesNotExist:
    #         return Response({"error": "Package not found in this TuDo"}, status=status.HTTP_404_NOT_FOUND)


class PackageViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Package.objects.filter(active=True)
    serializer_class = serializers.PackageSerializer

    def get_queryset(self):
        queryset = self.queryset
        q = self.request.query_params.get('q')
        tudo_id = self.request.query_params.get('tuDo')
        if q:
            queryset = queryset.filter(name__icontains=q)
        if tudo_id:
            queryset = queryset.filter(tuDo=tudo_id)
        return queryset

    @action(methods=['patch'], detail=True, url_path='update-package-status')
    def update_package_status(self, request, pk=None):
        try:
            # Tìm package qua pk (id của package)
            package = Package.objects.get(id=pk)
        except Package.DoesNotExist:
            return Response({"error": "Package not found"}, status=status.HTTP_404_NOT_FOUND)

        # Cập nhật status sang giá trị 'RECEIVED' (giả sử giá trị là 1)
        package.status = 1
        package.save()

        return Response({"message": "Package status updated successfully"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], url_path='delete-package')
    def delete_package(self, request, pk=None):
        try:
            package = self.get_object()  # Lấy món hàng theo id
            package.delete()  # Xóa món hàng
            return Response(status=status.HTTP_204_NO_CONTENT)  # Trả về trạng thái 204 No Content
        except Package.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class FeedbackViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
    # pagination_class = paginators.FeedbackPaginator
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], detail=False, url_path='add-feedback')
    def add_feedback(self, request):
        f = Feedback.objects.create(content=request.data.get('content'),
                                    user=request.user)
        return Response(serializers.FeedbackSerializer(f).data, status=status.HTTP_201_CREATED)


class SurveyViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Survey.objects.all()
    serializer_class = serializers.SurveySerializer

    @action(methods=['post'], detail=False, url_path='add-title')
    def add_title(self, request, pk=None):
        title = request.data.get('title')
        description = request.data.get('description')
        type_survey = request.data.get('type_survey')
        f = Survey.objects.create(title=title, description=description, type_survey=type_survey)
        return Response(serializers.SurveySerializer(f).data, status=status.HTTP_201_CREATED)


class SurveyQuestionViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = SurveyQuestion.objects.all()
    serializer_class = serializers.SurveyQuestionSerializer

    @action(methods=['post'], detail=False, url_path='add-question')
    def add_question(self, request, pk=None):
        serializer = serializers.SurveyQuestionSerializer(data=request.data)

        if serializer.is_valid():
            # Tạo mới câu hỏi khảo sát nếu dữ liệu hợp lệ
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Trả về lỗi nếu dữ liệu không hợp lệ
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SurveyAnswerViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = SurveyAnswer.objects.all()
    serializer_class = serializers.SurveyAnswerSerializer

    @action(methods=['post'], detail=False, url_path='add-answer')
    def add_answer(self, request):
        serializer = serializers.SurveyAnswerSerializer(data=request.data)

        if serializer.is_valid():
            question_id = request.data.get('question')
            user = request.user
            serializer.save(user=user, question_id=question_id)  # Ghi lại user vào câu trả lời

            # Trả về dữ liệu đã được tạo thành công
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Trả về lỗi nếu dữ liệu không hợp lệ
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = serializers.NotificationSerializer

    @action(methods=['post'], detail=False, url_path='add-notification')
    def add_notification(self, request, pk=None):
        title = request.data.get('title')
        description = request.data.get('description')
        f = Notification.objects.create(title=title, description=description)
        return Response(serializers.SurveySerializer(f).data, status=status.HTTP_201_CREATED)

