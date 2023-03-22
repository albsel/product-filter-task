Product filter task
In this test task, you are taking the role of a frontend developer in an ecommerce project.
The backend team has prepared an API that delivery product data for a listing page.
Your task now is to:

1. Show the product data in a grid.
2. Create two filters that narrow down the shown products.
   Please have a look at the image below for reference.
   This task is not about styling, so don’t worry too much making the result look good.
   The two filters are for product properties and for manufacturers. You can find them in the
   JSON data under the keys “properties” and “manufacturer”. While a product can have
   multiple properties, it will only ever have one manufacturer. Once the user selections a filter
   option, the list should immediately show only the products that match the selected filter.
   The options in the “properties” filter be applied as logical AND, so selecting two or more
   options here means that the shown products must match both properties. For example,
   selecting “Vegan” and “Gluten free” will only show products that are both vegan and gluten
   free, but not the ones that are only vegan without being gluten free (or the other way
   around).
   The “manufacturer” filter is a logical OR, so selecting two or more options from the list
   should show the products from all selected manufacturers.
   If, at this point, you find the above requirements too easy to implement, there are two
   bonus requirements you can add.
   First, as seen in the screenshot, show the numbers of products that match a filter option. As
   an example, you might initially have 10 products that are vegan, 6 that are gluten free, and 3
   that are both. Therefore, initially the filter would show “Vegan (10), Gluten free (6)”. After
   selecting the gluten free option, the filter would show “Vegan (3), Gluten free (6)”, because
   of the remaining 6 products, only 3 are also vegan and selecting the vegan option would
   reduce the shown products to those 3.
   Second, only show the filter options that are available in the remaining set of products. For
   example, if you select a manufacturer who does not offer vegan products, the “Vegan”
   option should no longer show up in the list of properties. Or, if you select “gluten free” and
   none of the remaining products are also lactose free, the “Lactose free” should be hidden.

###################################################################################################################################################
###################################################################################################################################################

# My Angular Project

This project is a simple Angular application that displays a list of items retrieved from a web service.

## Technologies Used

- Angular CLI: 15.1.6
- TypeScript 4.8.4
- Node.js 16.16.0
- Package Manager: npm 8.11.0

## Prerequisites

Before running the project, you must have Node.js and Angular CLI installed on your machine.

## Getting Started

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `ng serve` to start the development server.
4. Open `http://localhost:4200` in your web browser to view the application.

## Running Tests

To run the unit tests, run `ng test`.

## Contributing

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request.

## Troubleshooting

If you encounter any issues while running the project, try the following steps:

- Ensure that you have the correct version of Node.js and Angular CLI installed.
- Make sure that all dependencies are installed by running `npm install`.
- Check the console for error messages.
- Search the Angular documentation or Stack Overflow for solutions to common problems.
