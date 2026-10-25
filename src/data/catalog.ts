import type { Branch, Service, Offer, SalonContent } from "@/lib/api";

export const branches: Branch[] = [
  {
    "id": 1,
    "name": "Chi nhánh Quận 8",
    "address": "Lô 02.12 - Tầng 2 Pega Square, Chung cư Pegasuite, 1002 Tạ Quang Bửu, Phường Bình Đông, Thành Phố Hồ Chí Minh",
    "phone": "(+84)818798098",
    "opening_hours": "09:00–20:30"
  }
];
export const services: Service[] = [
  {
    "id": "service-01",
    "branch_id": 1,
    "name": "Combo 4 (chân)",
    "category": "Combo",
    "description": "Chà gót, Massage chân, Ngâm chân, Tẩy tbc",
    "price": 349000,
    "price_min": 349000,
    "price_max": 349000,
    "duration_minutes": null
  },
  {
    "id": "service-02",
    "branch_id": 1,
    "name": "Combo 3",
    "category": "Combo",
    "description": "Cắt da, sơn cứng móng tạo cầu móng, sơn gel/thạch\nChọn 1 trong 3 kiểu : tráng gương, french,ombre\nTặng design 2 ngón",
    "price": 489000,
    "price_min": 489000,
    "price_max": 489000,
    "duration_minutes": null
  },
  {
    "id": "service-03",
    "branch_id": 1,
    "name": "Combo 2",
    "category": "Combo",
    "description": "Cắt da, sơn cứng móng tạo cầu móng, Sơn mắt mèo\nTặng design đơn giản 1 ngón",
    "price": 289000,
    "price_min": 289000,
    "price_max": 289000,
    "duration_minutes": null
  },
  {
    "id": "service-04",
    "branch_id": 1,
    "name": "Combo 1",
    "category": "Combo",
    "description": "Cắt da, sơn cứng móng tạo cầu móng, Sơn gel/thạch, tặng design đơn giản 1 ngón",
    "price": 239000,
    "price_min": 239000,
    "price_max": 239000,
    "duration_minutes": null
  },
  {
    "id": "service-05",
    "branch_id": 1,
    "name": "Tẩy tế bào chết",
    "category": "Dịch vụ khác",
    "description": null,
    "price": 80000,
    "price_min": 80000,
    "price_max": 80000,
    "duration_minutes": null
  },
  {
    "id": "service-06",
    "branch_id": 1,
    "name": "Massage",
    "category": "Dịch vụ khác",
    "description": "15p",
    "price": 120000,
    "price_min": 120000,
    "price_max": 120000,
    "duration_minutes": null
  },
  {
    "id": "service-07",
    "branch_id": 1,
    "name": "Chà gót + ngâm thảo dược",
    "category": "Dịch vụ khác",
    "description": null,
    "price": 180000,
    "price_min": 180000,
    "price_max": 180000,
    "duration_minutes": null
  },
  {
    "id": "service-08",
    "branch_id": 1,
    "name": "Gắn sticker",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 5000,
    "price_min": 5000,
    "price_max": 30000,
    "duration_minutes": null
  },
  {
    "id": "service-09",
    "branch_id": 1,
    "name": "Gắn charm/đá",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 10000,
    "price_min": 10000,
    "price_max": 50000,
    "duration_minutes": null
  },
  {
    "id": "service-10",
    "branch_id": 1,
    "name": "Design hoạt hình",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 50000,
    "price_min": 50000,
    "price_max": 100000,
    "duration_minutes": null
  },
  {
    "id": "service-11",
    "branch_id": 1,
    "name": "Design / Gel nổi",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 10000,
    "price_min": 10000,
    "price_max": 100000,
    "duration_minutes": null
  },
  {
    "id": "service-12",
    "branch_id": 1,
    "name": "Ẩn xad cừ/ Vẩy cá/ Kim tuyến",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 10000,
    "price_min": 10000,
    "price_max": 50000,
    "duration_minutes": null
  },
  {
    "id": "service-13",
    "branch_id": 1,
    "name": "Loang/vân đá/marble",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 5000,
    "price_min": 5000,
    "price_max": 50000,
    "duration_minutes": null
  },
  {
    "id": "service-14",
    "branch_id": 1,
    "name": "French",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 25000,
    "price_min": 25000,
    "price_max": 220000,
    "duration_minutes": null
  },
  {
    "id": "service-15",
    "branch_id": 1,
    "name": "Ombre",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 25000,
    "price_min": 25000,
    "price_max": 220000,
    "duration_minutes": null
  },
  {
    "id": "service-16",
    "branch_id": 1,
    "name": "Tráng gương (ngón/bộ)",
    "category": "Nail art & trang trí",
    "description": null,
    "price": 25000,
    "price_min": 25000,
    "price_max": 220000,
    "duration_minutes": null
  },
  {
    "id": "service-17",
    "branch_id": 1,
    "name": "Sơn trên 3 màu",
    "category": "Phụ thu sơn nền",
    "description": "30 / bộ",
    "price": 30000,
    "price_min": 30000,
    "price_max": 30000,
    "duration_minutes": null
  },
  {
    "id": "service-18",
    "branch_id": 1,
    "name": "Sơn Ombre (chuyển màu)",
    "category": "Sơn nền cao cấp",
    "description": "Kỹ thuật pha màu mềm mại, đẳng cấp",
    "price": 220000,
    "price_min": 220000,
    "price_max": 220000,
    "duration_minutes": null
  },
  {
    "id": "service-19",
    "branch_id": 1,
    "name": "Sơn trên 3 màu",
    "category": "Sơn nền cao cấp",
    "description": "30 / bộ",
    "price": 30000,
    "price_min": 30000,
    "price_max": 30000,
    "duration_minutes": null
  },
  {
    "id": "service-20",
    "branch_id": 1,
    "name": "Sơn Flash",
    "category": "Sơn nền cao cấp",
    "description": "Phản quang dưới ánh đèn, hiệu ứng lung linh",
    "price": 180000,
    "price_min": 180000,
    "price_max": 180000,
    "duration_minutes": null
  },
  {
    "id": "service-21",
    "branch_id": 1,
    "name": "Sơn Mắt mèo (Cat Eye)",
    "category": "Sơn nền cao cấp",
    "description": "Hiệu ứng ánh sáng phản chiếu, sang trọng",
    "price": 200000,
    "price_min": 200000,
    "price_max": 200000,
    "duration_minutes": null
  },
  {
    "id": "service-22",
    "branch_id": 1,
    "name": "Sơn Thạch (Jelly)",
    "category": "Sơn nền cao cấp",
    "description": "Màu trong mờ, hiệu ứng trong suốt tự nhiên",
    "price": 139000,
    "price_min": 139000,
    "price_max": 139000,
    "duration_minutes": null
  },
  {
    "id": "service-23",
    "branch_id": 1,
    "name": "Sơn Gel",
    "category": "Sơn nền cao cấp",
    "description": "Gel cơ bản, bóng đẹp 2–3 tuần",
    "price": 139000,
    "price_min": 139000,
    "price_max": 139000,
    "duration_minutes": null
  },
  {
    "id": "service-24",
    "branch_id": 1,
    "name": "Dual form",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 300000,
    "price_min": 300000,
    "price_max": 300000,
    "duration_minutes": null
  },
  {
    "id": "service-25",
    "branch_id": 1,
    "name": "Đắp gel (Buildergel)",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 300000,
    "price_min": 300000,
    "price_max": 300000,
    "duration_minutes": null
  },
  {
    "id": "service-26",
    "branch_id": 1,
    "name": "Up móng",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 150000,
    "price_min": 150000,
    "price_max": 150000,
    "duration_minutes": null
  },
  {
    "id": "service-27",
    "branch_id": 1,
    "name": "Sơn Biab cứng móng ( có tạo cầu móng)",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 80000,
    "price_min": 80000,
    "price_max": 80000,
    "duration_minutes": null
  },
  {
    "id": "service-28",
    "branch_id": 1,
    "name": "Refill móng cũ",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 80000,
    "price_min": 80000,
    "price_max": 80000,
    "duration_minutes": null
  },
  {
    "id": "service-29",
    "branch_id": 1,
    "name": "Cắt da chân",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 50000,
    "price_min": 50000,
    "price_max": 50000,
    "duration_minutes": null
  },
  {
    "id": "service-30",
    "branch_id": 1,
    "name": "Cắt da tay + sửa form móng",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 50000,
    "price_min": 50000,
    "price_max": 50000,
    "duration_minutes": null
  },
  {
    "id": "service-31",
    "branch_id": 1,
    "name": "Tháo móng up/phá gel",
    "category": "Chăm sóc cơ bản",
    "description": null,
    "price": 30000,
    "price_min": 30000,
    "price_max": 50000,
    "duration_minutes": null
  }
];
export const offers: Offer[] = [
  {
    "id": "07eeffa4-7e74-4800-9c78-06e1a9b6549e",
    "name": "Ưu đãi chăm sóc móng tháng 10",
    "details": "Trải nghiệm dịch vụ chăm sóc móng tại Serpente Nail Room.",
    "branch_id": null,
    "start_date": "2026-08-13",
    "end_date": "2027-01-14",
    "image": "/content/offer-01.webp",
    "instagram_post_url": null,
    "sort_order": 0
  }
];
export const salonContents: Record<number, SalonContent> = {
  "1": {
    "id": 1,
    "name": "Serpente Nail Room",
    "display_name": "Serpente Nail Room",
    "instagram_handle": "serpente.nailroom",
    "google_maps_location": "Pega Square (Kingfood đi cầu thang bên trái lên, 1002 Tạ Quang Bửu, Chung cư Pegasuite 1, Bình Đông, Hồ Chí Minh 70000, Việt Nam",
    "google_maps_url": "https://maps.app.goo.gl/ymzjq9YAWH7otKPH9",
    "hotline": "081 879 8098",
    "contact_email": "serpentectv01@gmail.com",
    "facebook_name": "Serpente Nail Room",
    "tiktok_name": "Serpente - Chi nhánh Quận 8",
    "has_refreshments": true,
    "has_warranty": true,
    "warranty_days": 5,
    "brands": null,
    "experience_notes": null,
    "instagram_showcase": [
      {
        "id": 1,
        "title": null,
        "image_src": "/content/trend-01.webp",
        "instagram_url": "https://www.instagram.com/p/DeGQeQvynTm/",
        "sort_order": 1
      },
      {
        "id": 2,
        "title": "French tip kim tuyến ngọc trai",
        "image_src": "/content/trend-02.webp",
        "instagram_url": "https://www.instagram.com/p/DdLGgOuicGs/",
        "sort_order": 2
      },
      {
        "id": 3,
        "title": "French tip sữa đính hoa 3D",
        "image_src": "/content/trend-03.webp",
        "instagram_url": "https://www.instagram.com/p/DddH7VSpqk7/",
        "sort_order": 3
      },
      {
        "id": 4,
        "title": "Ngọc trai xà cừ",
        "image_src": "/content/trend-04.webp",
        "instagram_url": "https://www.instagram.com/p/DdITMpxib29/",
        "sort_order": 4
      }
    ],
    "customer_reviews": [
      {
        "id": 1,
        "branch_id": 1,
        "display_name": "Phương Liên Tạ",
        "content": "Thật sự là tiệm nail số một lòng tuii, tìm thấy chân ái rồi huhu. Mê tiệm này quá chừng luôn, làm đẹp không góc chê á",
        "source": "Google Maps",
        "source_url": "https://maps.app.goo.gl/Ln8rHHizBWrGWhPZ6",
        "sort_order": 1
      },
      {
        "id": 2,
        "branch_id": 1,
        "display_name": "Việt Đan Mã",
        "content": "Tiệm nằm trên tầng của chung cư nhưng dễ kiếm ( đi thẳng lên cầu thang là tới- tiệm xinh lắm mọi người .. mình làm tay chân sáng nay mọi thứ êm. Mình rất sợ tiếng mài móng - nóng do mài móng nữa mà trộm vía làm êm ru\n\n10/10 sẽ quay lại 🙏🏻😘❤️",
        "source": "Google Maps",
        "source_url": "https://maps.app.goo.gl/gnBL4bRiuQZY3Eew8",
        "sort_order": 2
      },
      {
        "id": 3,
        "branch_id": 1,
        "display_name": "phoinhu ly",
        "content": "tuyệt vời, 2 chị siêu takecare luôn. Mình đi với em gái mà, có đặt lịch trước. Các chị rất lịch sự và vui vẻ. Thái độ làm việc chuyên nghiệp. Liên tục hỏi xem có nóng khi cứng móng ko?\n\nLàm 2 bộ nails mà có hơn 500 cá xí. Đối với mình là rẻ. Với chỗ thì xịn, xinh, sạch mà chỗ cũng dễ kiếm nữa. Siêu recommended các bạn đến trải nghiệm 1 lần.\n\nBonus, tiệm còn cho phiếu tích điểm nữa. Đi 3 lần là đc giảm 10% nha",
        "source": "Google Maps",
        "source_url": "https://maps.app.goo.gl/HbmpcN7MzUiY1pbu7",
        "sort_order": 3
      },
      {
        "id": 4,
        "branch_id": 1,
        "display_name": "Ngoc Anh Chau",
        "content": "Kiếm được tiệm nail style clean gu xịn như ở trung tâm gần nhà quá ưng. Các achi nhân viên dễ thương, làm móng siêu xinh và kỹ 💝💝",
        "source": "Google Maps",
        "source_url": "https://maps.app.goo.gl/x6FFbFELWqyLr7Xv7",
        "sort_order": 4
      },
      {
        "id": 5,
        "branch_id": 1,
        "display_name": "Thi Men Nguyen",
        "content": "Tiệm đầu tiên làm tôi hài lòng\nMọi người kiếm chi hằng lam nha , lam qua là đẹp đi ạ 🫶🏼🫶🏼🫶🏼 …",
        "source": "Google Maps",
        "source_url": "https://maps.app.goo.gl/WHWUHFFb4PfDnjkS7",
        "sort_order": 5
      }
    ]
  }
};
