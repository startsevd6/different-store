import { ModalService } from "./../../services/modal.service";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent {
  form = new FormGroup({
    title: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  constructor(
    private ProductsService: ProductsService,
    private ModalService: ModalService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.ProductsService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
      rating: {
        rate: 42,
        count: 1,
      },
    }).subscribe(() => {
      this.ModalService.close();
    });
  }
}
