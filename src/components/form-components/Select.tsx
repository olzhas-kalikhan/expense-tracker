import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  label,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  options: string[] | readonly string[];
  label: string;
}) => {
  return (
    <FormField<TFieldValues, TName>
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((value) => (
                <SelectItem value={value} className="capitalize">
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};
