# Firebase firestore bundle cache expirenment

ทำการทดลองไอเดียการทำ cache บน Firestore ด้วย 2 ไอเดีย
- ไอเดียที่ 1 ใช้ Firebase firestore แพ็คเป็น bundle ไว้ แล้วค่อยนำ bundle นั้นโหลดมาใช้ทีเดียว (อารมณ์ zip file แล้วโหลดมาเป็น file ใหญ่ทีเดียวเพื่อใช้)

- ไอเดียที่ 2 ใช้ Firestore PersistentLocalCache จะได้ไม่ต้อง read ซ้ำบ่อยๆ

แล้วนำมาประยุกต์ใช้ผสมกัน

### ดู video การทดลองได้ที่
[![firestore-cache](https://img.youtube.com/vi/OU4l8RmEaPI/0.jpg)](https://youtu.be/OU4l8RmEaPI)

### อ่านฉบับบทความได้ที่
https://blog.mikelopster.dev/firestore-bundle-pricing
