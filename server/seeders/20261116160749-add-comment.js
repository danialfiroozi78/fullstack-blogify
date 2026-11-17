"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("comment", [
      {
        article_id: 10,
        user_id: 5,
        content:
          "مقاله خیلی خوبی بود. به نظرم هوش مصنوعی بیشتر باعث تغییر نقش برنامه‌نویس‌ها می‌شه تا حذف کامل اون‌ها.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 10,
        user_id: 5,
        content:
          "من خودم از ابزارهای AI برای نوشتن تست و پیدا کردن باگ استفاده می‌کنم و واقعاً سرعت کارم بیشتر شده.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 10,
        user_id: 5,
        content:
          "به نظرم در آینده مهارت حل مسئله خیلی مهم‌تر از حفظ کردن سینتکس زبان‌ها می‌شه.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 10,
        user_id: 5,
        content:
          "کاش درباره تأثیر هوش مصنوعی روی بازار کار برنامه‌نویسان تازه‌کار هم بیشتر توضیح می‌دادید.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 10,
        user_id: 5,
        content:
          "ممنون بابت توضیحات کامل. مخصوصاً بخش مهارت‌هایی که توسعه‌دهنده‌ها باید یاد بگیرن خیلی مفید بود.",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        article_id: 11,
        user_id: 5,
        content:
          "مطالب خیلی روان و قابل فهم توضیح داده شده بودن. ممنون از نویسنده.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 11,
        user_id: 5,
        content:
          "به نظرم اضافه کردن مثال‌های عملی بیشتر می‌تونه مقاله رو کاربردی‌تر کنه.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 11,
        user_id: 5,
        content:
          "من تازه وارد برنامه‌نویسی شدم و این مقاله کمک کرد بعضی مفاهیم رو بهتر درک کنم.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 11,
        user_id: 5,
        content:
          "آیا امکانش هست در آینده یک آموزش پروژه‌محور هم درباره این موضوع منتشر کنید؟",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 11,
        user_id: 5,
        content:
          "ساختار مقاله و دسته‌بندی مطالب خیلی خوب بود. منتظر مقاله‌های بعدی هستم.",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        article_id: 12,
        user_id: 5,
        content:
          "توضیحات خیلی مفید بودن. مخصوصاً مقایسه فناوری‌ها باعث شد موضوع رو بهتر متوجه بشم.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 12,
        user_id: 5,
        content:
          "به نظرم برای شروع بهتره اول مفاهیم پایه رو یاد بگیریم و بعد سراغ فریم‌ورک‌ها بریم.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 12,
        user_id: 5,
        content:
          "من چند ماهه دارم روی پروژه‌های واقعی کار می‌کنم و نکات این مقاله برام کاربردی بود.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 12,
        user_id: 5,
        content:
          "ممنون می‌شم درباره بهترین روش‌های یادگیری و تمرین هم یک مقاله جداگانه بنویسید.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        article_id: 12,
        user_id: 5,
        content:
          "عالی بود! به نظرم این مقاله برای افرادی که تازه برنامه‌نویسی رو شروع کردن خیلی مناسبه.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comment", {
      article_id: [10, 11, 12],
      user_id: 5,
    });
  },
};
