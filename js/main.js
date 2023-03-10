Vue.component('product', {
    template: `
    <div class="product">
    
    <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText" />
    </div>
    
    <div class="product-info">
        <h1>{{ title }}</h1>  
            <p>{{ description }}</p>
                <a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks">{{link}}</a>
            <p v-if="inventory > 10">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
           
            <p :class="{ outOfStock: !inStock }" v-else > Out of stock </p>
       <span>
            <p>{{OnSale}}</p>  
       </span>
       
       <ul>
           <li v-for="detail in details">{{ detail }}</li>
       </ul>
            
       <ul>
           <li v-for="size in sizes">{{ size }}</li>
       </ul>
         
       
       <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId" :style="{ backgroundColor:variant.variantColor }" @mouseover="updateProduct(index)">
       
       </div>
    
       <div class="cart">
                <p>Cart({{ cart }})</p>
        <button v-on:click="cart -= 1"> Delete from cart </button>
    
       </div>
    
        <p>Shipping: {{ shipping }}</p>
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }"> Add to cart </button> 

            <form class="review-form" @submit.prevent="onSubmit">
 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>

 <p>
   <input type="submit" value="Submit"> 
 </p>

</form>

        </div>
       </div>
        
    </div>
</div> `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            cart: [],
            premium: true,
            description: "A pair of warm, fuzzy socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "More products like this",
            inStock: true,
            inventory: 100,
            name: null,
            review: null,
            rating: null,
            onSale: "On sale!",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 100


                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0

                }
            ],
            cart: 0,
        }
    },
    methods: {
        
        addToCart() {
            this.cart += 1
            this.$emit('add-to-cart');
        },
        
        deleteToCart() {
            this.cart -= 1
        },
        
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        
        updateCart(id) {
            this.cart.push(id);
            this.cart += 1;
        },
        
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        OnSale() {
            return this.brand + ' ' + this.product + ' ' + this.onSale;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: 0
    }
})
Vue.component('product-details', {
    template: `{{ detail }}`,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})
Vue.component('product-review', {
    template: `
        <input>
      `,
    data() {
        return {
            name: null
        }
    }
})
