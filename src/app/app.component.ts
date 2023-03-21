import { Component } from "@angular/core";
import productsData from "src/assets/data/products.json"; // Import data from a JSON file

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html", // Define the template file for the component
  styleUrls: ["./app.component.scss"], // Define the style file for the component
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
    const propertyOptions: {
      label: string;
      value: string;
      selected: boolean;
      count: number;
    }[] = [];
    const productCounts: { [property: string]: number } = {};

    // Count the number of products for each property
    this.products.forEach((product) => {
      product.properties.forEach((property) => {
        if (productCounts.hasOwnProperty(property)) {
          productCounts[property]++;
        } else {
          productCounts[property] = 1;
        }
      });
    });

    // Create an option for each property, including the product count
    Object.keys(productCounts).forEach((property) => {
      const count = productCounts[property];
      propertyOptions.push({
        label: `${property} (${count})`,
        value: property,
        selected: false,
        count: count,
      });
    });

    return propertyOptions;
  }

  // Function to generate the manufacturer filter options
  getManufacturerOptions() {
    const manufacturerOptions: {
      label: string;
      value: string;
      selected: boolean;
      count: number;
    }[] = [];

    const manufacturerCounts: { [manufacturer: string]: number } = {};

    this.products.forEach((product) => {
      const manufacturer = product.manufacturer;

      if (manufacturerCounts.hasOwnProperty(manufacturer)) {
        manufacturerCounts[manufacturer]++;
      } else {
        manufacturerCounts[manufacturer] = 1;
      }
    });

    Object.keys(manufacturerCounts).forEach((manufacturer) => {
      const count = manufacturerCounts[manufacturer];

      manufacturerOptions.push({
        label: `${manufacturer} (${count})`,
        value: manufacturer,
        selected: false,
        count: count,
      });
    });

    return manufacturerOptions;
  }

  // property function works with this code..
  // Function to filter the products based on the selected property and manufacturer filter options
  filterPropertiesProducts() {
    const selectedProperties = this.propertyOptions.filter(
      (option) => option.selected
    );
    const selectedManufacturers = this.manufacturerOptions.filter(
      (option) => option.selected
    );
    this.filteredProducts = this.products.filter((product) => {
      const hasSelectedProperties = selectedProperties.every((property) =>
        product.properties.includes(property.value)
      );
      const hasSelectedManufacturers = selectedManufacturers.some(
        (manufacturer) => product.manufacturer === manufacturer.value
      );

      if (!hasSelectedManufacturers) {
        return hasSelectedProperties;
      } else {
        return hasSelectedManufacturers;
      }
      // return hasSelectedProperties && hasSelectedManufacturers;
    });
  }

  // manufactory function works with this code...
  filterManufctoryProducts() {
    const selectedProperties = this.propertyOptions.filter(
      (option) => option.selected
    );
    const selectedManufacturers = this.manufacturerOptions.filter(
      (option) => option.selected
    );
    this.filteredProducts = this.products.filter((product) => {
      const hasSelectedProperties = selectedProperties.every((property) =>
        product.properties.includes(property.value)
      );
      const hasSelectedManufacturers = selectedManufacturers.some(
        (manufacturer) => product.manufacturer === manufacturer.value
      );
      return hasSelectedProperties && hasSelectedManufacturers;
    });
  }
}
