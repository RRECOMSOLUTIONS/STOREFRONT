import { Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="relative w-full border-b border-ui-border-base">
      {/* Full Clarity Image */}
      <div className="relative w-full">
        <img
          src="/Top_10_Must_Have.webp"
          alt="Hero Background"
          className="w-full h-auto object-cover max-h-[100vh]"
          loading="eager"
          style={{
            imageRendering: "auto", // Ensure no pixelation
          }}
        />

        {/* Centered Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-60 p-3 md:p-10 rounded-md text-center gap-y-4">
          <span>
            <Heading
              level="h1"
              className="text-xl md:text-4xl lg:text-5xl leading-10 text-white font-bold drop-shadow-lg font-twentieth-century"
            >
              Ecommerce Starter Template
            </Heading>
            <Heading
              level="h2"
              className="md:mt-3 text-lg md:text-2xl lg:text-3xl leading-10 text-gray-200 font-medium drop-shadow-md font-twentieth-century"
            >
              Powered by RRECOM Solutions
            </Heading>
          </span>
          {/* Optional GitHub Button */}
          {/* <a
            href="https://github.com/medusajs/nextjs-starter-medusa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="flex items-center gap-2 shadow-lg">
              View on GitHub
              <Github />
            </Button>
          </a> */}
          </div>
        </div>

        {/* <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-8 md:p-16 lg:p-32 gap-6 bg-black/30">
          <span>
            <Heading
              level="h1"
              className="text-3xl md:text-4xl lg:text-5xl leading-10 text-white font-bold drop-shadow-lg font-twentieth-century"
            >
              Ecommerce Starter Template
            </Heading>
            <Heading
              level="h2"
              className="text-lg md:text-2xl lg:text-3xl leading-10 text-gray-200 font-medium drop-shadow-md font-twentieth-century"
            >
              Powered by RRECOM Solutions
            </Heading>
          </span>
          <a
            href="https://github.com/medusajs/nextjs-starter-medusa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="flex items-center gap-2 shadow-lg">
              View on GitHub
              <Github />
            </Button>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
