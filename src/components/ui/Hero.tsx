import Image from "next/image";

export default function Hero() {
  return (
    <section className=" flex flex-col">
      <div className=" w-screen relative left-1/2 -translate-x-1/2 bg-gray-200">
        <div className=" container flex flex-col gap-12">
          {/* text content  */}
          <div className=" w-full flex flex-col md:flex-row justify-center items-end mt-12">
            {/* heading  */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-tight">
                Discover our journey and what drives us
              </h1>
            </div>

            {/* text  */}
            <div>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We are passionate about empowering individuals and businesses to
                take control of their finances and achieve their financial
                goals.
              </p>
            </div>
          </div>

          {/* image  */}
          <div className="">
            <Image
              src={"/hero-img.jpg"}
              alt="hero image"
              width={1000}
              height={200}
              className=" object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className=" container bg-green-300">
        quae distinctio quaerat reiciendis aspernatur facilis maxime fugit
        placeat laboriosam velit sequi consequuntur, id libero quos ipsum
        nesciunt non, optio laborum consectetur beatae quasi! Impedit, officiis!
        Soluta explicabo nemo fugit sunt maiores blanditiis voluptatibus
        accusamus similique unde, nostrum quibusdam perspiciatis iure architecto
        optio tempora dolorem?
      </div>
    </section>
  );
}
