type PrincipalButtonProps = {
    id : number;
    textClassName: string;
    backgroundClassName: string;
    iconBGClassName: string;
    iconComponent: React.ReactElement;
}

export function PrincipalButton({id,textClassName,backgroundClassName,iconBGClassName,iconComponent } : PrincipalButtonProps) { 
    return(
        <div className={`${backgroundClassName} flex flex-nowrap w-[92px] rounded-2xl px-3 py-4 gap-3 justify-center items-center flex-col`}>
            <div className={`${iconBGClassName} flex justify-center items-center w-9 h-9 rounded-[69.23px] border-[2.77px] border-white`}>
                {iconComponent}
            </div>
            <p className="font-poppins font-medium text-[13px] leading-5 tracking-[-0.43px] text-center text-black">
                {textClassName}
            </p>
        </div>
    );
}