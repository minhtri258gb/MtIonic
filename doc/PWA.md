
1. Nhóm API Tương tác Hệ thống & Giao diện
Các API này giúp PWA không còn là một "trang web trong khung" mà hòa nhập hoàn toàn vào OS:

Web App Manifest: Cung cấp thông tin để ứng dụng có thể "Cài đặt" (Install) lên màn hình chính, có splash screen và chạy độc lập (standalone) không có thanh địa chỉ.

Badging API: Hiển thị số thông báo (ví dụ: số tin nhắn chưa đọc) trên biểu tượng ứng dụng ở thanh Dock hoặc màn hình chính.

App Shortcuts: Cho phép người dùng nhấn giữ biểu tượng ứng dụng để mở nhanh các lối tắt (ví dụ: "Viết tin nhắn mới", "Mở thư viện").

Web Share API & Web Share Target: Giúp PWA có thể chia sẻ nội dung (text, ảnh, file) sang các app khác và ngược lại, nhận dữ liệu được chia sẻ từ các app khác.

Launch Handler API: Kiểm soát cách PWA mở ra khi người dùng click vào link hoặc file (ví dụ: mở trong tab mới hay dùng cửa sổ hiện tại).

2. Nhóm API Phần cứng & Kết nối
Đây là khu vực PWA thể hiện sức mạnh "Native-like" rõ rệt nhất trên các trình duyệt dựa trên Chromium (Chrome, Edge):

Web Bluetooth API: Kết nối và giao tiếp trực tiếp với các thiết bị Bluetooth Low Energy (BLE).

Web USB / Web Serial API: Kết nối trực tiếp với phần cứng qua cổng USB hoặc cổng nối tiếp (Serial), rất hữu ích cho các ứng dụng công nghiệp hoặc điều khiển vi mạch.

Web NFC: Đọc và ghi thẻ NFC (chủ yếu trên Android).

WebHID API: Tương tác với các thiết bị ngoại vi như tay cầm chơi game, bàn phím chuyên dụng.

Geolocation API: Truy cập vị trí chính xác của thiết bị.

3. Nhóm API Dữ liệu & Offline
Đảm bảo ứng dụng vẫn hoạt động khi không có mạng, một đặc điểm cốt lõi của Native App:

Service Workers: "Trái tim" của PWA, cho phép quản lý bộ nhớ cache, xử lý yêu cầu mạng và chạy ngầm.

Background Sync API: Trì hoãn việc gửi dữ liệu (như gửi tin nhắn) cho đến khi thiết bị có kết nối mạng ổn định.

Periodic Background Sync: Cho phép ứng dụng cập nhật nội dung mới trong nền một cách định kỳ (ví dụ: tải tin tức mới vào sáng sớm).

File System Access API: Cho phép PWA đọc và lưu thay đổi trực tiếp vào file hoặc thư mục trên máy tính người dùng (giống như Photoshop hay VS Code).

4. Nhóm API Trải nghiệm Người dùng Nâng cao
Push API & Notifications API: Gửi thông báo đẩy đến người dùng ngay cả khi trình duyệt đã đóng.

Web OTP API: Tự động điền mã xác thực từ tin nhắn SMS.

Screen Wake Lock API: Giữ màn hình luôn sáng khi đang đọc sách hoặc xem hướng dẫn nấu ăn, ngăn thiết bị tự khóa.

Contact Picker API: Cho phép người dùng chọn số điện thoại hoặc email từ danh bạ hệ thống để nhập vào app.

WebGPU / WebGL: Cung cấp hiệu năng đồ họa cực cao cho game và các ứng dụng xử lý hình ảnh 3D.