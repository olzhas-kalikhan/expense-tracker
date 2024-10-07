import { type NumericFormatProps, NumericFormat } from "react-number-format";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const FormNumberField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  numberInputProps,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: string;
  numberInputProps?: NumericFormatProps;
}) => {
  return (
    <FormField
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <NumericFormat
              customInput={Input}
              onValueChange={({ floatValue }) => {
                onChange(floatValue);
              }}
              {...field}
              {...numberInputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
};
