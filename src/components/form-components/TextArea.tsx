import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export const FormTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  formItemProps,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  formItemProps?: React.ComponentProps<typeof FormItem>;
  label: string;
}) => {
  return (
    <FormField
      render={({ field }) => (
        <FormItem {...formItemProps}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};
