import {PrincipalButton} from "./principal-button";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";

const navigationOptions = [
    {
        id : 1,
        textClassName: "Nueva consulta",
        backgroundClassName: "bg-[#D9F2FC]",
        iconBGClassName: "bg-[#396AFF]",
        iconComponent: <Plus size={16} />
    },
    {
        id : 2,
        textClassName: "Crear paciente",
        backgroundClassName: "bg-[#D6D8FF]",
        iconBGClassName: "bg-[#4D3DF7]",
        iconComponent: <Plus size={16} />
    },
    {
        id : 3,
        textClassName: "Lista de pacientes",
        backgroundClassName: "bg-[#FCEFC7]",
        iconBGClassName: "bg-[#FFFFFF]",
        iconComponent: <Search color="black"/>
    },
];

export function Options(){
    return(
        <div className="flex w-[343px]">
          <div className="flex flex-col rounded-3xl p-4 gap-4 bg-white">
            <p className="font-poppins font-semibold text-base leading-[100%] text-[#333B69]">
                ¿Qué deseas hacer hoy?
            </p>
            <div className="flex flex-row grow flex-wrap gap-4">
                {
                    navigationOptions.map(
                        ({id, textClassName, backgroundClassName, iconBGClassName, iconComponent}) => (
                            <PrincipalButton
                                key={id}
                                id={id}
                                textClassName={textClassName} 
                                backgroundClassName={backgroundClassName} 
                                iconBGClassName={iconBGClassName} 
                                iconComponent={iconComponent}
                            />
                        )
                    )
                }
            </div>
          </div>
        </div>
    );
}