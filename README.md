Projeyi clone ettikten sonra env dosyası ouşturarak içine mongo database url'si ve yüklenecek dosyalar içinde projenin localde nerede çalışacağını yazın.
Örnek .env:
DATABASE_URL = "mongodb://localhost/task-management-system"
BASE_URL = "http://localhost:3000"

Daha sonra npm i diyerek bağılılıkları yükleyin.
Ardından npm run start:dev ile projeyi çalıştırabilirsiniz.
