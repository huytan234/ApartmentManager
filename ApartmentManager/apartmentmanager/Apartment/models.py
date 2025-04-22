from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
import datetime

USER_CHOICES = (
    (0, 'Admin'),
    (1, 'Resident')
)

BILL_CHOICES = (
    (0, 'MOMO'),
    (1, 'VNPAY'),
    (2, 'NGÂN HÀNG')
)

STATUS_CHOICES = (
    (0, 'PENDING'),
    (1, 'PASS'),
)

FAMILY_CHOICES = (
    (0, 'VỢ/CHỒNG'),
    (1, 'CON'),
    (2, 'BỐ/MẸ'),
    (3, 'ANH/EM'),
)

PACKAGE_CHOICES = (
    (0, 'WAITING'),
    (1, 'RECEIVED'),
)

SURVEY_CHOICES = (
    (0, 'VỆ SINH'),
    (1, 'CƠ SỞ VẬT CHẤT'),
    (2, 'DỊCH VỤ'),
    (3, 'KHÁC')
)


class User(AbstractUser):
    DoesNotExist = None
    avatar = CloudinaryField(null=True)
    role = models.IntegerField(choices=USER_CHOICES, null=True, blank=True)

    # tuDo = models.OneToOneField('TuDo', on_delete=models.CASCADE, related_name='user', null=True)

    def save(self, *args, **kwargs):
        # Đặt role thành 0 nếu là superuser
        if self.is_superuser:
            self.role = 0
        # Đảm bảo nếu không phải superuser, role mặc định sẽ là 1 nếu chưa có
        elif self.role is None:
            self.role = 1
        super().save(*args, **kwargs)


class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    update_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


# Dch vụ
class Service(BaseModel):
    name = models.CharField(max_length=255)  # Tên dịch vụ
    description = models.TextField(blank=True)  # Mô tả dịch vụ
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Giá dịch vụ

    def __str__(self):
        return self.name


# Hóa đơn
class Bill(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ManyToManyField(Service, related_name='bill')
    name = models.CharField(max_length=50, null=True)
    # Phương thức thanh toán
    payment_method = models.IntegerField(choices=BILL_CHOICES, null=True, blank=True)
    bill_date = models.DateField(default=datetime.date.today)
    bill_image = CloudinaryField(null=True)
    # Tổng tiền
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Xác nhận thanh toán
    status = models.IntegerField(choices=STATUS_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.name


# Người thân
class ResidentFamily(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='family')
    name = models.CharField(max_length=50, null=True)
    cccd = models.CharField(max_length=50, unique=True)
    sdt = models.CharField(max_length=15)
    relationship = models.IntegerField(choices=FAMILY_CHOICES, null=True, blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.name


# Tủ đồ
class TuDo(BaseModel):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name


# Món hàng
class Package(BaseModel):
    name = models.CharField(max_length=50, null=True)
    tuDo = models.ForeignKey(TuDo, on_delete=models.CASCADE, related_name='package')
    status = models.IntegerField(choices=PACKAGE_CHOICES, default=0, null=True, blank=True)

    def __str__(self):
        return self.name


# Phản ánh
class Feedback(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedback')
    # Nội dung phản ánh
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Survey(BaseModel):
    title = models.CharField(max_length=255)  # Tiêu đề khảo sát
    description = models.TextField(blank=True)  # Mô tả khảo sát
    type_survey = models.IntegerField(choices=SURVEY_CHOICES, null=True, blank=True)  # Danh mục khảo sát
    created_at = models.DateTimeField(auto_now_add=True)  # Ngày tạo khảo sát
    is_active = models.BooleanField(default=True)  # Trạng thái hoạt động (có thể sử dụng để đóng khảo sát)

    def __str__(self):
        return self.title


class SurveyQuestion(BaseModel):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='questions')  # Khảo sát
    question_text = models.TextField()  # Nội dung câu hỏi

    # options = models.TextField(blank=True)  # Các lựa chọn (nếu có)

    def __str__(self):
        return self.question_text


class SurveyAnswer(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='survey_answers')  # Cư dân
    question = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE, related_name='answers')  # Câu hỏi
    answer = models.TextField(blank=True)

    def __str__(self):
        return self.user.username


class Notification(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
