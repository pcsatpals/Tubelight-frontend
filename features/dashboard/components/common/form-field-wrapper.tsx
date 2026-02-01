import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";


type InputLikeProps = React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldWrapperProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    component: React.ComponentType<InputLikeProps>;
    className?: string;
    required?: boolean;
    type?: string;
    disable?: boolean;
    showMessage?: boolean;
    onFocus?: () => void;
};

const FormFieldWrapper = <T extends FieldValues>({
    control,
    name,
    label = "",
    placeholder,
    component: Component,
    className = "",
    required = false,
    type = "text",
    disable = false,
    showMessage = true,
    onFocus,
}: FormFieldWrapperProps<T>) => (
    <FormField
        control={control}
        name={name}
        disabled={disable}
        render={({ field }) => (
            <FormItem className="font-inter">
                {label && (
                    <FormLabel className="flex gap-0.5 text-sm font-inter ">
                        <span dangerouslySetInnerHTML={{ __html: label }} />
                        {required && <span className="text-[red]">*</span>}
                    </FormLabel>
                )}
                <FormControl>
                    <Component
                        {...field}
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                        ) => {
                            let value: string | number | null = e.target.value;
                            if (type === "number") {
                                value = Number(value);
                            }
                            if (value == 0) {
                                value = null;
                            }
                            field.onChange(value);
                        }}
                        type={type}
                        min="0"
                        max="100"
                        onFocus={onFocus}
                        value={field.value ?? ""}
                        placeholder={placeholder}
                        className={className}
                    />
                </FormControl>
                {showMessage && <FormMessage />}
            </FormItem>
        )}
    />
);

export default FormFieldWrapper;