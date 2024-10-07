# Expense Tracker App

## Setup and Run

- clone git repo `git clone https://github.com/olzhas-kalikhan/expense-tracker.git`
- change current directory `cd expense-tracker`
- Install dependencies `npm install`
- Local run `npm run dev`
- Build `npm run build`
- Preview build `npm run preview`

## Core Tools

- TypeScript
- Vite
- React
- @tanstack/react-router

## Libs

- react-hook-form
- @tanstack/react-table
- ChartJS + react-chartjs-2

## Styling

- TailwindCSS
- shadcn-ui (radix-ui)

## Assumptions

App will be for tracking user's personal expenses. Some components like form components are abstracted with assuming they might be used in the other forms.
However other components like data table, and charts are not abstracted since it has less use cases.
Unit test would've been added with more time.
