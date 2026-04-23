const RoadMapPage = () => {
    return (
        <section id="roadmap-area" className="flex-1 relative overflow-y-auto bg-[#FAFAFA] pb-32 pt-12 flex flex-col items-center">
            <div className="text-center mb-12 max-w-lg px-6">
                <h2 className="text-3xl font-black text-gray-900 mb-3">Your Journey to Auxiliar Administrativo</h2>
                <p className="text-gray-500 font-semibold">Complete lessons to master the required skills. You're doing great!</p>
            </div>

            <div className="relative w-full max-w-md flex flex-col items-center">
                <svg className="absolute top-0 w-full h-[1200px] z-0 pointer-events-none" viewBox="0 0 400 1200" preserveAspectRatio="none">
                    <path d="M 200 0 C 300 150, 100 300, 200 450 C 300 600, 100 750, 200 900 C 300 1050, 100 1200, 200 1200" fill="none" stroke="#E5E7EB" strokeWidth="24" strokeLinecap="round"></path>
                    <path className="path-line" d="M 200 0 C 300 150, 100 300, 200 450 C 300 600, 100 750, 200 900 C 300 1050, 100 1200, 200 1200" fill="none" stroke="#34D399" strokeWidth="8" strokeLinecap="round"></path>
                </svg>

                <div className="relative z-10 flex flex-col items-center w-full h-[1200px] gap-y-[120px] pt-10">
                    
                    <div className="relative group cursor-pointer" style={{ transform: "translateX(40px)" }}>
                        <div className="w-20 h-20 rounded-full bg-brand-green text-white flex items-center justify-center shadow-[0_8px_0_#059669] transform transition-transform active:translate-y-2 active:shadow-none hover:scale-105 border-4 border-white">
                            <i className="text-3xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></i>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-1.5 rounded-xl shadow-sm font-bold text-gray-700 text-sm">
                            Office Basics
                        </div>
                    </div>

                    <div className="relative group cursor-pointer" style={{ transform: "translateX(-40px)" }}>
                        <div className="w-20 h-20 rounded-full bg-brand-green text-white flex items-center justify-center shadow-[0_8px_0_#059669] transform transition-transform active:translate-y-2 active:shadow-none hover:scale-105 border-4 border-white">
                            <i className="text-3xl text-brand-yellow" data-fa-i2svg=""><svg className="svg-inline--fa fa-star" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg></i>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-lg transform rotate-12 shadow-sm">
                            +50 XP
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-1.5 rounded-xl shadow-sm font-bold text-gray-700 text-sm">
                            Data Entry
                        </div>
                    </div>

                    <div className="relative group cursor-pointer node-bounce" style={{ transform: "translateX(50px)" }}>
                        <div className="absolute -inset-4 bg-brand-blueLight rounded-full opacity-50 animate-pulse"></div>
                        <div className="w-24 h-24 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-[0_10px_0_#2563EB] transform transition-transform active:translate-y-2 active:shadow-none hover:scale-105 border-4 border-white relative z-10">
                            <i className="text-4xl ml-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-play" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg></i>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-5 py-3 rounded-2xl shadow-soft whitespace-nowrap z-20 pointer-events-none">
                            <div className="font-black text-gray-800">Email Etiquette</div>
                            <div className="text-brand-orange font-bold text-sm">Lesson 3/5</div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>
                        </div>
                    </div>

                    <div className="relative group opacity-60" style={{ transform: "translateX(-30px)" }}>
                        <div className="w-20 h-20 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shadow-[0_8px_0_#D1D5DB] border-4 border-white">
                            <i className="text-2xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-lock" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"></path></svg></i>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-1.5 rounded-xl shadow-sm font-bold text-gray-500 text-sm">
                            Scheduling
                        </div>
                    </div>

                    <div className="relative group opacity-60" style={{ transform: "translateX(20px)" }}>
                        <div className="w-24 h-24 rounded-[2rem] bg-gray-200 text-gray-400 flex items-center justify-center shadow-[0_10px_0_#D1D5DB] border-4 border-white">
                            <i className="text-3xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-chess-rook" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chess-rook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"></path></svg></i>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-1.5 rounded-xl shadow-sm font-bold text-gray-500 text-sm">
                            Module 1 Exam
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
 
export default RoadMapPage;
