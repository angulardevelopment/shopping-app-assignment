import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent, PRODUCTS} from './app.component';
import {ChangeDetectionStrategy} from "@angular/core";
import {ProductListComponent} from "./product-list/product-list.component";
import {CartComponent} from "./cart/cart.component";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;
  let items;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  const getById = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`#${id}`);
  };

  const IDMAPS = {
    ADD_BTN: 'btn-quantity-add',
    SUBTRACT_BTN: 'btn-quantity-subtract',
    ADD_TO_CART_BTN: 'btn-item-add',
    QUANTITY_INPUT: 'cart-quantity'
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductListComponent,
        CartComponent
      ],
      imports: [
        FormsModule
      ]
    })
      .overrideComponent(AppComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('Add item to cart', async () => {
    let addToCartBtn, cartQuantity, cartItem;
    await fixture.whenStable();
    cartItem = getById('cart-item-0');
    expect(cartItem).toBeFalsy();

    fixture.detectChanges();

    items = compiled.querySelectorAll('.product-item');
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    expect(cartQuantity).toBeFalsy();
    expect(addToCartBtn).toBeTruthy();
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    expect(cartQuantity).toBeTruthy();
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    expect(addToCartBtn).toBeNull();
    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();

    const cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('1');
    const cartItemName = getByTestId('cart-item-name', cartItem);
    expect(cartItemName.innerHTML).toEqual(PRODUCTS[1].name);
  });

  it('Update quantity in cart', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartItem, cartQuantity,
      cartItemQuantity;
    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[0]);
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[0]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[0]);
    expect(addToCartBtn).toBeNull();
    expect(cartQuantity.value).toEqual('1');
    addBtn = getByTestId(IDMAPS.ADD_BTN, items[0]);
    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[0]);

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('2');

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('3');

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();
    cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('3');

    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(cartQuantity.value).toEqual('2');

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeTruthy();
    cartItemQuantity = getByTestId('cart-item-quantity', cartItem);
    expect(cartItemQuantity.innerHTML).toEqual('2');


  })

  it('Remove item from cart', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartItem;
    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[2]);
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[2]);
    expect(addToCartBtn).toBeFalsy();

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[2]);
    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addBtn = getByTestId(IDMAPS.ADD_BTN, items[2]);
    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[2]);
    expect(addBtn).toBeFalsy();
    expect(subtractBtn).toBeFalsy();

    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[2]);
    expect(addToCartBtn).toBeTruthy();

    cartItem = getById('cart-item-0');
    expect(cartItem).toBeFalsy();
  })

  it('Performs Series of Actions', async () => {
    let addToCartBtn, addBtn, subtractBtn, cartQuantity,
      cartItem1, cartItem2;

    await fixture.whenStable();
    items = compiled.querySelectorAll('.product-item');
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[3]);
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addBtn = getByTestId(IDMAPS.ADD_BTN, items[3]);
    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[3]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[3]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[3]);
    expect(addBtn).toBeTruthy();
    expect(subtractBtn).toBeTruthy();
    expect(cartQuantity).toBeTruthy();
    expect(addToCartBtn).toBeFalsy();


    items = compiled.querySelectorAll('.product-item');
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    addBtn = getByTestId(IDMAPS.ADD_BTN, items[1]);
    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[1]);
    cartQuantity = getByTestId(IDMAPS.QUANTITY_INPUT, items[1]);
    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[1]);
    expect(addBtn).toBeTruthy();
    expect(subtractBtn).toBeTruthy();
    expect(cartQuantity).toBeTruthy();
    expect(addToCartBtn).toBeFalsy();

    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('2');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[3].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[1].name);

    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[3].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[1].name);

    subtractBtn = getByTestId(IDMAPS.SUBTRACT_BTN, items[3]);
    subtractBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    expect(cartItem1).toBeTruthy();

    cartItem2 = getById('cart-item-1');
    expect(cartItem2).toBeFalsy();

    addToCartBtn = getByTestId(IDMAPS.ADD_TO_CART_BTN, items[4]);
    addToCartBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    cartItem1 = getById('cart-item-0');
    cartItem2 = getById('cart-item-1');
    expect(cartItem1).toBeTruthy();
    expect(cartItem2).toBeTruthy();
    expect(getByTestId('cart-item-quantity', cartItem1).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-quantity', cartItem2).innerHTML).toEqual('1');
    expect(getByTestId('cart-item-name', cartItem1).innerHTML).toEqual(PRODUCTS[1].name);
    expect(getByTestId('cart-item-name', cartItem2).innerHTML).toEqual(PRODUCTS[4].name);


  })
});
