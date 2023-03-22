import { Component } from "@angular/core";
import productsData from "src/assets/data/products.json"; // Import data from a JSON file

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  products = productsData; // Assign the data from the JSON file to the 'products' property
  propertyOptions: { label: string; value: string; selected: boolean }[]; // Declare a property to hold the property filter options
  manufacturerOptions: { label: string; value: string; selected: boolean }[]; // Declare a property to hold the manufacturer filter options
  filteredProducts: any[]; // Declare a property to hold the filtered products

  constructor() {
    // Initialize the property and manufacturer filter options, and set the initial filtered products to all products
    this.propertyOptions = this.getPropertyOptions();
    this.manufacturerOptions = this.getManufacturerOptions();
    this.filteredProducts = this.products;
  }

  // Function to generate the property filter options
  getPropertyOptions() {
    // Declare an empty array to store the property options
    const propertyOptions: {
      label: string;
      value: string;
      selected: boolean;
      count: number;
    }[] = [];

    // Declare an empty object to store the count of products for each property
    const productCounts: { [property: string]: number } = {};

    // Loop through each product and count the number of products for each property
    this.products.forEach((product) => {
      product.properties.forEach((property) => {
        if (productCounts.hasOwnProperty(property)) {
          productCounts[property]++;
        } else {
          productCounts[property] = 1;
        }
      });
    });

    // Loop through each property and create an option for it with the count of products that have that property
    Object.keys(productCounts).forEach((property) => {
      const count = productCounts[property];
      propertyOptions.push({
        label: `${property} (${count})`,
        value: property,
        selected: false,
        count: count,
      });
    });

    // Return the array of property options
    return propertyOptions;
  }

  // Function to generate the manufacturer filter options
  getManufacturerOptions() {
    // Declare an array to hold the manufacturer filter options, with an initial empty array
    const manufacturerOptions: {
      label: string;
      value: string;
      selected: boolean;
      count: number;
    }[] = [];

    // Declare an object to hold the count of products for each manufacturer, with an initial empty object
    const manufacturerCounts: { [manufacturer: string]: number } = {};

    // Loop through each product to count the number of products for each manufacturer
    this.products.forEach((product) => {
      const manufacturer = product.manufacturer;
      if (manufacturerCounts.hasOwnProperty(manufacturer)) {
        manufacturerCounts[manufacturer]++;
      } else {
        manufacturerCounts[manufacturer] = 1;
      }
    });

    // Loop through each manufacturer and create an option, including the product count, and add it to the options array
    Object.keys(manufacturerCounts).forEach((manufacturer) => {
      const count = manufacturerCounts[manufacturer];
      manufacturerOptions.push({
        label: `${manufacturer} (${count})`,
        value: manufacturer,
        selected: false,
        count: count,
      });
    });

    // Return the options array
    return manufacturerOptions;
  }

  /**
   * Filters the products based on the selected filter options.
   * The filtered products are stored in the 'filteredProducts' property.
   */
  filterProducts() {
    // Get the selected property and manufacturer filter options
    const selectedProperties = this.propertyOptions.filter(
      (option) => option.selected
    );
    const selectedManufacturers = this.manufacturerOptions.filter(
      (option) => option.selected
    );

    // Filter the products based on the selected filter options
    this.filteredProducts = this.products.filter((product) => {
      // Check if the product has all selected properties
      const hasSelectedProperties = selectedProperties.every((property) =>
        product.properties.includes(property.value)
      );

      // Check if the product has any selected manufacturer
      const hasSelectedManufacturers = selectedManufacturers.some(
        (manufacturer) => product.manufacturer === manufacturer.value
      );

      // If both property and manufacturer filters are selected, only show products that match both
      if (selectedProperties.length > 0 && selectedManufacturers.length > 0) {
        return hasSelectedProperties && hasSelectedManufacturers;
      }
      // If only property filter is selected, show products that match any selected property
      else if (selectedProperties.length > 0) {
        return hasSelectedProperties;
      }
      // If only manufacturer filter is selected, show products that match any selected manufacturer
      else if (selectedManufacturers.length > 0) {
        return hasSelectedManufacturers;
      }
      // If no filters are selected, show all products
      else {
        return true;
      }
    });
  }
}
