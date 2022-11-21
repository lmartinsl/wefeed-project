import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category.interface';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss']
})
export class ProductRegisterComponent implements OnInit {
  public formRegister: FormGroup

  headerTitle: string = "Cadastro"
  categoryInfo: any;


  constructor(
  private readonly fb: FormBuilder,
  private service: ProductsService,
  private activatedRoute: ActivatedRoute,
  private readonly router: Router

  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.categoryInfo = {
        id: params.id,
        name: params.name,
      };
      this.createRegisterInputForm()

    })
  }

  goBackNavigation(event?: any) {
    this.router.navigate(['main/products'], { queryParams: { id: this.categoryInfo.id, name: this.categoryInfo.name  }, skipLocationChange: true })
  }

  createRegisterInputForm() {
    const { minLength, maxLength, required } = Validators

    this.formRegister = this.fb.group({
      productName: ['', [minLength(5), required]],
      productDescription: ['', [minLength(10), maxLength(300), required]],
      productVolume: ['', [minLength(2), required]],
      productQuantity: ['', [ required]],
      productDueDate: ['', [ required]],
    })
  }

  registerProduct(){
    const { productName, productDescription, productVolume, productQuantity, productDueDate} = this.formRegister.controls
    
    const category: ICategory = {
      id: this.categoryInfo.id
    };

    const product = {
      name: productName.value,
      description: productDescription.value,
      quantity: productQuantity.value,
      volume: productVolume.value,
      dueDate: productDueDate.value,

    }

    // console.log(productName.value, productDescription.value, productVolume.value, productQuantity.value, productDueDate.value)

  this.service.putProducts(category, product).subscribe(    
    () => {
      this.goBackNavigation()    
    })
  }

}
