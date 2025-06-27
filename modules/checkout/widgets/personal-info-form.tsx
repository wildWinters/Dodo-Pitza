import { nunito800 } from "@/font/fonts";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/ui/input";
import { type InputField  } from "../types/type";


export const PersonalInfoForm = ({
  inputFields,
  onChange,
}: {
  inputFields: InputField[];
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <form className="bg-white rounded-[30px] px-[35px] py-[30px] w-full max-w-[752px]">
      <h2 className={`text-[30px] mb-4 ${nunito800.className}`}>
        2. Персональна інформація
      </h2>
      <div className="grid grid-cols-2 gap-[26px]">
        {inputFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col gap-[5px] max-w-[328px] w-full"
          >
            <Label htmlFor={field.name} className="text-[14px] font-semibold">
              {field.label}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              className={`w-full h-[48px] px-3 rounded-[10px] border-2 ${
                field.hasError ? "border-red-500" : "border-[#EFEFEF]"
              }`}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
            {field.hasError && (
              <span className="text-red-500 text-[14px]">{field.errorText}</span>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};