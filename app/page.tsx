'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Package, Truck, Users, Eye, Star, Check } from 'lucide-react';
import productsData from '@/data/products.json';

interface ProductVariant {
  name: string;
  description: string;
  image: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  shippingPrice: number;
  unit: string;
  image: string;
  images?: string[];
  category: string;
  brand?: string;
  variants?: ProductVariant[];
  features?: string[];
  inStock?: boolean;
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
    brand: 'Brand',
    features: 'Features',
    variants: 'Available Variants',
    inStock: 'Original',
    outOfStock: 'Out of Stock',
    viewLarger: 'Click to view larger',
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
    brand: 'แบรนด์',
    features: 'คุณสมบัติ',
    variants: 'รุ่นที่มีจำหน่าย',
    inStock: 'มีสินค้า',
    outOfStock: 'สินค้าหมด',
    viewLarger: 'คลิกเพื่อดูขนาดใหญ่',
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
    brand: 'ব্র্যান্ড',
    features: 'বৈশিষ্ট্য',
    variants: 'উপলব্ধ ভেরিয়েন্ট',
    inStock: 'স্টকে আছে',
    outOfStock: 'স্টক নেই',
    viewLarger: 'বড় দেখতে ক্লিক করুন',
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const products = productsData as Product[];
  const t = translations[currentLanguage];

  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleImageSelect = (productId: number, imageIndex: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [productId]: imageIndex
    }));
  };

  const openImagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
    document.body.style.overflow = 'unset';
  };

  const toggleProductExpansion = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300 bg-white border-2 hover:border-yellow-400">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Images */}
                    <div className="space-y-3">
<div className="relative">
  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative">
    <img
      src={product.images && product.images.length > 0 
        ? product.images[selectedImages[product.id] || 0] 
        : product.image}
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onClick={() => {
        const currentImageSrc = product.images && product.images.length > 0 
          ? product.images[selectedImages[product.id] || 0] 
          : product.image;
        openImagePreview(currentImageSrc);
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://images.pexels.com/photos/4198375/pexels-photo-4198375.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
      }}
    />
    {/* Eye icon overlay that appears on hover */}
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
      <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
  <p className="text-xs text-gray-500 mt-1 text-center">{t.viewLarger}</p>
</div>

                      
                      {/* Image Gallery Thumbnails */}
                      {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                          {product.images.slice(0, 8).map((img, index) => (
                            <button
                              key={index}
                              onClick={() => handleImageSelect(product.id, index)}
                              className={`aspect-square rounded-md overflow-hidden border-2 transition-all hover:scale-105 ${
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
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-100 text-green-800">
                              {product.category}
                            </Badge>
                            {product.brand && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                                {product.brand}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            {product.name}
                          </h3>
                        </div>
                        {product.inStock && (
                          <Badge className="bg-green-500 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            {t.inStock}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">{t.features}:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Star className="w-3 h-3 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pricing */}


                      {/* View Details Button */}
                      {product.variants && product.variants.length > 0 && (
                        <Button 
                          onClick={() => toggleProductExpansion(product.id)}
                          variant="outline" 
                          className="w-full text-green-800 border-green-300 hover:bg-green-50"
                        >
                          {expandedProduct === product.id ? 'Hide Details' : `View ${product.variants.length} ${t.variants}`}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Product Variants */}
                  {expandedProduct === product.id && product.variants && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-green-800 mb-4">{t.variants}:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.variants.map((variant, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={variant.image}
                                alt={variant.name}
                                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => openImagePreview(variant.image)}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.pexels.com/photos/4198375/pexels-photo-4198375.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-green-800 text-sm">{variant.name}</h5>
                              <p className="text-xs text-gray-600 mb-1">{variant.description}</p>
                              <p className="text-sm font-medium text-yellow-600">BDT {variant.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={closeImagePreview}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/4198375/pexels-photo-4198375.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}