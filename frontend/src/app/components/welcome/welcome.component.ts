import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FlowerService} from 'src/app/service/flower.service';
import {FlowerCategoryService} from 'src/app/service/flower-category.service';
import { Flower } from 'src/app/common/flower';
import { ActivatedRoute } from '@angular/router';
import { FlowerCategory } from 'src/app/common/flower-category';
import {ShoppingCartService} from 'src/app/service/shopping-cart.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  flowers:Flower[];
  searchMode: boolean = false;
  constructor(private flowerService:FlowerService,
    private route: ActivatedRoute,
    private cartService:ShoppingCartService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getFlowers();
    });

  }
  private getFlowers() {
    this.searchMode = this.route.snapshot.paramMap.has('name');
    if(this.searchMode){
     this.getFlowersByName();
    }else{
      this.getAllFlowers();
    }

  }
  getFlowersByName(){
    const theKeyword: string = this.route.snapshot.paramMap.get('name');
    this.flowerService.getFlowerByName(theKeyword).subscribe(data=>{
      this.flowers = data;
      console.log(this.flowers);
      } 
    )
  }
  getAllFlowers(){
    this.flowerService.getProductList().subscribe(
      data => {
        this.flowers = data;
        console.log(this.flowers);
      }
    );
  }
  addToCart(theFlower:Flower){
    console.log(`Adding to cart ${theFlower.name},${theFlower.price}`);

    const theCartItem=new Flower(theFlower);

    this.cartService.addToCart(theCartItem);
  }
}
