# AppNation.CaseStudy Uygulama Altyapı Bilgileri
Uygulama backend NodeJs, frontedend React ve database olarak PostgreSQL kullanarak olarak kodlanmıştır.

# Site Bilgileri
Sayfayı açtığınızda sizi bir login sayfası karşılayacaktır. Login sayfasına kullanıcı adını admin şifreyi P@ssword!!! olarak girdiğinizde sisteme admin olarak giriş yapacaksınız.
Giriş yapıldıktan sonra uygulama sizi kullanıcı listesine yönlendirecektir. Bu sayfada sistemde kayıt tüm kullanıcılar bir tabloda listeleniyor olacaktır.
Taboda kıllanıcıların kullanıcı adına tıklayarak kullanıcı detayına gidebilirsiniz. Kullanıcı detayında düzenleme yapıp kaydet butonuna bastığınızda kullanıcı bilgileri güncellir, sil butonuna basığınızda şıkan popup ekranda onay verdiğinizde kullanıcı silinir.
Navbar da yer alan yeni kullanıcı butonuna tıklayarak yeni bir kullanıcı oluşturabilirsiniz. Kullancı oluşturulduktan sonra site sizi otomatiik olarak oluşturulan kullanıcının detayına yönlendirecektir.
Navbarda yer alan çıkış butonu aracılığı ile siteden çıkabilirsiniz.

# API Bilgileri
Uygulamaya Rest API e sahiptir.
https://documenter.getpostman.com/view/26785500/2s9Y5SWkpo adresinden API a ilişkin dökümantasyona ulaşabilirsiniz.

# Database Bilgiliri
Database tek filess.io sitesinden oluşturulmuştur ve postgresdir.
Ücretsik kullanım olduğundan bir takım kısıtlamalara sahiptir. Bu nedenle database tek bir tablodan oluşmaktadır ve tablo içeriği aşağıdaki gibidir;

users tablosu:
    user_id INT GENERATED ALWAYS AS IDENTITY,
    user_name varchar(50) not null unique,
    first_name varchar(60) not null,
    last_name varchar(60) not null,
    email varchar(60),
    password varchar(60) not null, (hash'li bir şekilde tutulmaktadır.)
    is_admin boolean not null,
    Primary key (user_id)

PostgreSQL Url: postgresql://AppNation_evendateno:f27eb603058794fd036af3fd9f3a53c346df1f1b@3u7.h.filess.io:5432/AppNation_evendateno
