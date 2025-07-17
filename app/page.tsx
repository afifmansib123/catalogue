'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Package, Truck, Users } from 'lucide-react';
import productsData from '@/data/products.json';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  shippingPrice: number;
  unit: string;
  image: string;
  images?: string[]; // Optional array for multiple images
  category: string;
}

type Language = 'en' | 'th' | 'bn';

const languages = {
  en: 'English',
  th: 'ไทย',
  bn: 'বাংলা'
};

const translations = {
  en: {
    companyName: 'Lotus & Lily Trading',
    tagline: 'Your Trusted Partner for Thai Products in Bangladesh',
    description: 'We specialize in bulk supply of premium Thai products to Bangladesh. We handle all shipping logistics and provide comprehensive support to help entrepreneurs establish successful businesses.',
    catalogue: 'Product Catalogue',
    price: 'Price',
    shipping: 'Shipping',
    total: 'Total',
    per: 'per',
    category: 'Category',
    services: 'Our Services',
    bulkSupply: 'Bulk Supply',
    bulkSupplyDesc: 'Large quantity orders with competitive pricing',
    shippingLogistics: 'Shipping & Logistics',
    shippingDesc: 'Complete shipping solutions from Thailand to Bangladesh',
    businessSupport: 'Business Support',
    businessSupportDesc: 'Guidance and support for new entrepreneurs',
    contact: 'Contact Us',
    contactDesc: 'Ready to start your business? Get in touch with us today!'
  },
  th: {
    companyName: 'โลตัส แอนด์ ลิลลี่ เทรดดิ้ง',
    tagline: 'พันธมิตรที่เชื่อถือได้สำหรับผลิตภัณฑ์ไทยในบังกลาเทศ',
    description: 'เราเชี่ยวชาญในการจัดหาผลิตภัณฑ์ไทยคุณภาพสูงให้กับบังกลาเทศ เราจัดการโลจิสติกส์การจัดส่งทั้งหมด และให้การสนับสนุนอย่างครอบคลุมเพื่อช่วยผู้ประกอบการสร้างธุรกิจที่ประสบความสำเร็จ',
    catalogue: 'แคตตาล็อกผลิตภัณฑ์',
    price: 'ราคา',
    shipping: 'ค่าจัดส่ง',
    total: 'รวม',
    per: 'ต่อ',
    category: 'หมวดหมู่',
    services: 'บริการของเรา',
    bulkSupply: 'จัดหาจำนวนมาก',
    bulkSupplyDesc: 'สั่งซื้อปริมาณมากด้วยราคาที่แข่งขันได้',
    shippingLogistics: 'การจัดส่งและโลจิสติกส์',
    shippingDesc: 'โซลูชั่นการจัดส่งครบวงจรจากไทยไปบังกลาเทศ',
    businessSupport: 'การสนับสนุนธุรกิจ',
    businessSupportDesc: 'คำแนะนำและการสนับสนุนสำหรับผู้ประกอบการใหม่',
    contact: 'ติดต่อเรา',
    contactDesc: 'พร้อมที่จะเริ่มธุรกิจของคุณหรือไม่? ติดต่อเราวันนี้!'
  },
  bn: {
    companyName: 'লোটাস অ্যান্ড লিলি ট্রেডিং',
    tagline: 'বাংলাদেশে থাই পণ্যের জন্য আপনার বিশ্বস্ত অংশীদার',
    description: 'আমরা বাংলাদেশে প্রিমিয়াম থাই পণ্যের বাল্ক সরবরাহে বিশেষজ্ঞ। আমরা সমস্ত শিপিং লজিস্টিক্স পরিচালনা করি এবং উদ্যোক্তাদের সফল ব্যবসা প্রতিষ্ঠায় সহায়তা করার জন্য ব্যাপক সহায়তা প্রদান করি।',
    catalogue: 'পণ্যের ক্যাটালগ',
    price: 'মূল্য',
    shipping: 'শিপিং',
    total: 'মোট',
    per: 'প্রতি',
    category: 'বিভাগ',
    services: 'আমাদের সেবা',
    bulkSupply: 'বাল্ক সরবরাহ',
    bulkSupplyDesc: 'প্রতিযোগিতামূলক মূল্যে বড় পরিমাণের অর্ডার',
    shippingLogistics: 'শিপিং এবং লজিস্টিক্স',
    shippingDesc: 'থাইল্যান্ড থেকে বাংলাদেশে সম্পূর্ণ শিপিং সমাধান',
    businessSupport: 'ব্যবসায়িক সহায়তা',
    businessSupportDesc: 'নতুন উদ্যোক্তাদের জন্য নির্দেশনা এবং সহায়তা',
    contact: 'আমাদের সাথে যোগাযোগ করুন',
    contactDesc: 'আপনার ব্যবসা শুরু করার জন্য প্রস্তুত? আজই আমাদের সাথে যোগাযোগ করুন!'
  }
};

export default function CataloguePage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [selectedImages, setSelectedImages] = useState<{[key: number]: number}>({});
  const products = productsData as Product[];
  const t = translations[currentLanguage];

  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleImageSelect = (productId: number, imageIndex: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [productId]: imageIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                {t.companyName}
              </h1>
              <p className="text-lg text-yellow-600 font-medium mb-3">
                {t.tagline}
              </p>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {t.description}
              </p>
            </div>
            
            <div className="flex gap-2">
              {(Object.keys(languages) as Language[]).map((lang) => (
                <Button
                  key={lang}
                  variant={currentLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentLanguage(lang)}
                  className={currentLanguage === lang ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {languages[lang]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">{t.services}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.bulkSupply}</h3>
                <p className="text-gray-600">{t.bulkSupplyDesc}</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.shippingLogistics}</h3>
                <p className="text-gray-600">{t.shippingDesc}</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">{t.businessSupport}</h3>
                <p className="text-gray-600">{t.businessSupportDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">{t.catalogue}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300 bg-white border-2 hover:border-yellow-400">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    {/* Product Image */}
                    <div className="space-y-2">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.images && product.images.length > 0 
                            ? product.images[selectedImages[product.id] || 0] 
                            : product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/4198375/pexels-photo-4198375.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
                          }}
                        />
                      </div>
                      
                      {/* Image Gallery Thumbnails */}
                      {product.images && product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {product.images.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => handleImageSelect(product.id, index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                (selectedImages[product.id] || 0) === index 
                                  ? 'border-yellow-400 shadow-md' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={img}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.pexels.com/photos/4198375/pexels-photo-4198375.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <Badge className="mb-2 bg-green-100 text-green-800">
                          {product.category}
                        </Badge>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Separator />
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t.price}:</span>
                            <span className="font-medium">BDT{product.price} {t.per} {product.unit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t.shipping}:</span>
                            <span className="font-medium">BDT{product.shippingPrice}</span>
                          </div>
                          <div className="flex justify-between text-base font-semibold text-green-800 pt-1 border-t">
                            <span>{t.total}:</span>
                            <span>${product.price + product.shippingPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.contact}</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            {t.contactDesc}
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-green-800 font-semibold">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 {t.companyName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}