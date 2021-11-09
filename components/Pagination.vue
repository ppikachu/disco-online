<template>
    <div class="m-pagesBox">
      <nuxt-link class="prev"
                 :disabled="currentPage<=1"
                 tag="button"
                 :to="{path: '/',query:{page:currentPage-1,type:type}}">
        <i class="iconfont myhr-backward"></i>
        prev
      </nuxt-link>
      <div class="pages inline" v-if="count<=11">
        <nuxt-link v-for="item in count"
                   :key="item"
                   :class="currentPage===item?'active':''"
                   :to="{path: '/',query:{page:item,type:type}}">{{item}}</nuxt-link>
      </div>
      <div class="pages inline" v-else>
        <template v-if="currentPage <= 6">
          <nuxt-link v-for="item in 10"
                     :key="item"
                     :class="currentPage===item?'active':''"
                     :to="{path: '/',query:{page:item,type:type}}">{{item}}</nuxt-link>
          <nuxt-link :to="{path: '/',query:{page:currentPage+9>count?count:currentPage+9,type:type}}">...</nuxt-link>
          <nuxt-link v-if="count>11" :to="{path: '/',query:{page:count,type:type}}">{{count}}</nuxt-link>
        </template>
        <template v-else>
          <nuxt-link :to="{path: '/',query:{page:'1',type:type}}">1</nuxt-link>
          <nuxt-link :to="{path: '/',query:{page:currentPage-9<1?1:currentPage-9,type:type}}">...</nuxt-link>
          <template v-if="currentPage + 5 < count">
            <nuxt-link v-for="item in getArr(currentPage-4,currentPage)"
                       :key="item"
                       :to="{path: '/',query:{page:item,type:type}}">{{item}}</nuxt-link>
            <nuxt-link v-for="item in getArr(currentPage+1,currentPage+4)"
                       :key="item"
                       :class="currentPage===item?'active':''"
                       :to="{path: '/',query:{page:item,type:type}}">{{item}}</nuxt-link>
            <nuxt-link :to="{path: '/',query:{page:currentPage+9>count?count:currentPage+9,type:type}}">...</nuxt-link>
            <nuxt-link :to="{path: '/',query:{page:count,type:type}}">{{count}}</nuxt-link>
          </template>
          <template v-else>
            <nuxt-link v-for="item in getArr(count-9,count)"
                       :key="item"
                       :class="currentPage===item?'active':''"
                       :to="{path: '/',query:{page:item,type:type}}">{{item}}</nuxt-link>
          </template>
        </template>
      </div>
      <nuxt-link class="next"
                :disabled="currentPage===count"
                 tag="button"
                 :to="{path: '/',query:{page:currentPage+1,type:type}}">
        <i class="iconfont myhr-forward"></i>
        prox
      </nuxt-link>
    </div>
</template>

<script>
  export default {
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage:{
        type:Number,
        default: 1
      },
      total:{
        type:Number
      },
      type: {
        type: String,
        value: ''
      }
    },
    computed:{
      count(){
        return Math.ceil(this.total/this.pageSize);
      }
    },
    methods:{
      getArr(firstNum,lastNum){
        let arr=[];
        for(let i=firstNum;i<=lastNum;i++){
          arr.push(i);
        }
        return arr;
      }
    }
  }
</script>