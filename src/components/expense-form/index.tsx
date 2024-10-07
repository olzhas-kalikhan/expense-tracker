import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import {
  EXPENSE_TYPES,
  ExpenseRecord,
  expensesActions,
} from "~/store/expenses";
import { FormDatePicker } from "~/components/form-components/DatePicker";
import { FormSelect } from "~/components/form-components/Select";
import { FormNumberField } from "~/components/form-components/NumberField";
import { useAppDispatch } from "~/store";
import { FormTextArea } from "../form-components/TextArea";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, CircleDashed } from "lucide-react";

const FormSchema = z.object({
  type: z.enum(EXPENSE_TYPES),
  amount: z.number().min(0, "Amount must be a positive number"),
  date: z.date().max(new Date(), "Future dates are not allowed"),
  notes: z.string().max(100, "Only 100 characters are allowed"),
});
type FormValues = z.infer<typeof FormSchema>;

const defaultValues = {
  type: "grocery" as ExpenseRecord["type"],
  amount: 0,
  date: new Date(),
  notes: "",
};

const mapRecordToFormValues = (expenseRecord: ExpenseRecord) => ({
  type: expenseRecord.type,
  amount: expenseRecord.amount,
  date: new Date(expenseRecord.date),
  notes: expenseRecord.notes,
});

export default function ExpenseForm({
  expenseRecord,
}: {
  expenseRecord?: ExpenseRecord;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const isEdit = !!expenseRecord;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdit
      ? mapRecordToFormValues(expenseRecord)
      : defaultValues,
  });

  const { isSubmitted, isSubmitting } = form.formState;

  async function onSubmit({ date, ...rest }: z.infer<typeof FormSchema>) {
    if (isEdit) {
      await dispatch(
        expensesActions.updateExpense({
          id: expenseRecord.id,
          date: date.toISOString(),
          ...rest,
        }),
      )
        .unwrap()
        .then((updatedRecord) => {
          toast({
            title: "Expense record was updated",
          });

          form.reset(mapRecordToFormValues(updatedRecord));
        });
    } else {
      await dispatch(
        expensesActions.createExpense({
          date: date.toISOString(),
          ...rest,
        }),
      )
        .unwrap()
        .then((expenseRecord) => {
          toast({
            title: "Expense record was created",
          });
          navigate({
            to: "/expenses/$expenseId",
            params: { expenseId: expenseRecord.id },
          });
        });
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 500);
    }
  }, [isSubmitted]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-2/3 grid-cols-3 gap-x-4 gap-y-6"
      >
        <FormSelect
          control={form.control}
          name="type"
          label="Expense Type"
          options={EXPENSE_TYPES}
        />
        <FormNumberField control={form.control} name="amount" label="Amount" />
        <FormDatePicker
          control={form.control}
          name="date"
          label="Date"
          formItemProps={{ className: "w-full" }}
        />
        <FormTextArea
          control={form.control}
          name="notes"
          label="Notes"
          formItemProps={{ className: "col-span-3" }}
        />
        <div className="col-span-2" />
        <Button type="submit" disabled={isSubmitting || showSuccess}>
          {isSubmitting && <CircleDashed className="animate-spin" />}
          {showSuccess && <Check />}
          {!isSubmitting && !showSuccess && "Submit"}
        </Button>
      </form>
    </Form>
  );
}
