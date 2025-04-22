# Sử dụng hình ảnh Python chính thức
FROM python:3.11-slim

# Thiết lập biến môi trường cho Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file requirements.txt để cài đặt các thư viện
COPY requirements.txt /app/

# Cài đặt các thư viện cần thiết
RUN pip install --upgrade pip && pip install -r requirements.txt

# Sao chép toàn bộ mã nguồn của ứng dụng vào container
COPY . /app/

# Mở cổng 8000 (Django mặc định sử dụng cổng này)
EXPOSE 8000

# Chạy các lệnh Django chuẩn bị cơ sở dữ liệu và khởi chạy server
CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]