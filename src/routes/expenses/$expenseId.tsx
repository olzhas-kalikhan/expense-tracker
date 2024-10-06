import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { EXPENSE_TYPES, expensesActions } from "~/store/expenses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { expenseSelectors, useAppDispatch, useAppSelector } from "~/store";
import { FormDatePicker } from "~/components/form-components/DatePicker";

export const Route = createFileRoute("/expenses/$expenseId")({
  component: RouteComponent,
  context: ({ params }) => ({ getTitle: () => params.expenseId }),
});

const FormSchema = z.object({
  type: z.enum(EXPENSE_TYPES),
  amount: z.number(),
  date: z.date().max(new Date(), "Future dates are not allowed"),
  notes: z.string().max(100, "Only 100 characters are allowed"),
});

function RouteComponent() {
  const { expenseId } = Route.useParams();
  const dispatch = useAppDispatch();
  const expenseRecord = useAppSelector((state) =>
    expenseSelectors.recordsIdSelector(state, expenseId),
  );

  if (!expenseRecord) {
    throw new Error("Record is not found");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: expenseRecord.type,
      amount: expenseRecord.amount,
      date: new Date(expenseRecord.date),
      notes: expenseRecord.notes,
    },
  });

  function onSubmit({ date, ...rest }: z.infer<typeof FormSchema>) {
    dispatch(
      expensesActions.updateExpense({
        id: expenseId,
        date: date.toISOString(),
        ...rest,
      }),
    );

    toast({
      title: "Expense record was updated",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-2/3 grid-cols-3 gap-x-4 gap-y-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select expense type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EXPENSE_TYPES.map((type) => (
                    <SelectItem value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDatePicker name="date" label="Date" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
