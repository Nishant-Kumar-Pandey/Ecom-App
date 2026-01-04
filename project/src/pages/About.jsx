import React from "react";

export default function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                    <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            We are passionate about delivering quality products that elevate your lifestyle. Our journey began with a simple idea: make premium accessible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
                    <div className="relative h-full min-h-[300px]">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                            alt="Team working"
                            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover shadow-xl ring-1 ring-gray-900/10"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h3>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            We believe in more than just commerce. We believe in connection. Every product we curate is designed to solve a problem, bring joy, or improve your daily routine. We work directly with artisans and manufacturers to ensure ethical sourcing and top-tier quality.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <p className="text-3xl font-bold text-blue-600">10k+</p>
                                <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <p className="text-3xl font-bold text-blue-600">5k+</p>
                                <p className="text-sm text-gray-500 mt-1">Products Sold</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}