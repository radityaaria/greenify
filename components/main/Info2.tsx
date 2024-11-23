import React from "react";

const Info2: React.FC = () => {
  const plans = [
    {
      price: "Rp 50K",
      title: "Personal",
      description: "cocok untuk kebanyakan rumah tangga atau personal",
      features: ["✅ Diambil setiap 1 minggu sekali", "❌ Tempat sampah pintar"],
      isPopular: false,
    },
    {
      price: "Rp 70K",
      title: "Rumah Tangga",
      description: "cocok untuk kebanyakan rumah tangga atau personal",
      features: ["✅ Diambil setiap 1 minggu sekali", "✅ Tempat sampah pintar"],
      isPopular: false,
    },
    {
      price: "Rp 90K",
      title: "UMKM",
      description: "cocok untuk UMKM yang menghasilkan limbah setiap hari",
      features: ["✅ Diambil setiap hari", "✅ Tempat sampah pintar"],
      isPopular: true,
    },
    {
      price: "Rp ±100K",
      title: "Perusahaan",
      description: "cocok untuk perusahaan yang memiliki limbah yang banyak",
      features: ["✅ Diambil setiap hari", "✅ Tempat sampah pintar"],
      isPopular: false,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white w-full">
      <div className="bg-white flex flex-row space-x-6 px-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative bg-[#016A70] text-white px-4 pt-10 pb-6 rounded-lg shadow-lg flex flex-col"
          >
            {plan.isPopular && (
              <div className="absolute top-4 right-4 bg-white text-black text-sm font-bold py-1 px-3 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h2 className="text-2xl font-bold">
              {plan.price} <span className="text-sm font-normal">/bulan</span>
            </h2>
            <h3 className="text-xl font-bold mt-4">{plan.title}</h3>
            <p className="text-md mt-4">{plan.description}</p>
            <ul className="text-md mt-4 space-y-1">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <button className="bg-white w-full text-teal-700 font-bold py-2 px-4 rounded-lg mt-6 hover:bg-gray-200">
              Choose plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info2;
