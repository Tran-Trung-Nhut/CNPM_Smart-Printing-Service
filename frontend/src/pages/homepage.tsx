

export default function HomePage({ className = "" }: HomePageProps) {
  return (
    <div
      className={`font-roboto flex w-full flex-col gap-y-[424px] bg-white pt-[437px] text-center ${className}`}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center pr-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-28 gap-y-10 min-[1430px]:flex-nowrap" >
            <div className="flex flex-col items-center pb-px text-center">
              <div className="flex items-center justify-center rounded-lg border border-solid border-red-700 bg-red-600 px-28 py-8" >
                <div className="font-inter text-center leading-none tracking-[0px] text-[mistyrose]" >
                  Button
                </div>
              </div>
            </div>
            <div className="rounded-[100px] bg-[darkslateblue] px-24 py-8 text-center text-sm font-medium leading-5 tracking-[0.1px] text-white" >
              Label
            </div>
            <div className="h-8 w-16 flex-shrink-0 text-center"  > 
            < button className="border-2 border-black h-16 w-32 hover:scale-110" >ha_khung</button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-purple-50 px-2 py-3">
        <div className="pb-1 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs leading-4 tracking-[0.5px] min-[1430px]:flex-nowrap" >
            <div className="flex flex-col items-center gap-y-1 text-center">
              <div className="flex items-center justify-center">
                <div className="flex items-center rounded-2xl text-center">
                  <div className="flex h-full w-full flex-shrink-0 flex-col items-center overflow-clip rounded-2xl bg-purple-100" >
                    <button className="h-8 w-16 flex-shrink-0 text-center" />
                  </div>
                </div>
              </div>
              <div className="self-stretch font-semibold text-zinc-900">
                Explore
              </div>
            </div>
            <div className="flex w-[469px] flex-shrink-0 flex-col items-center gap-y-1 text-center" >
              <button className="h-8 w-16 flex-shrink-0" />
              <div className="self-stretch font-medium text-zinc-700">
                Saved
              </div>    
            </div>
            <div className="flex flex-col items-center gap-y-1 text-center">
              <div className="flex items-center justify-center">
                <button className="h-8 w-16 flex-shrink-0 text-center" />
              </div>
              <div className="self-stretch font-medium text-zinc-700">
                Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HomePageProps {
  className?: string;
}