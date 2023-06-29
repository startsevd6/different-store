import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IProduct } from "src/app/models/product";
import { ModalService } from "src/app/services/modal.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
})
export class ProductPageComponent {
  title = "Different Store";
  loading = false;
  products$: Observable<IProduct[]>;
  term = "";

  constructor(
    public productsService: ProductsService,
    public modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
