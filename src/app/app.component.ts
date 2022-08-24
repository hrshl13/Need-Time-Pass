import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListFormat } from 'typescript';

interface BoredApi{
  accessibility:number,
  activity:string, 
  key:string,
  link:string,
  participants:number,
  type:string,
  price:number
}
interface ListofData{
  memes:Array<MemeApi>
}
interface MemeApi{
  url:string, 
  name:string,
  width:number,
  height:number
}
interface response{
  data:ListofData
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Call-APIs';
  activity:string= "";
  url:string="";
  MAX_MEME_COUNT=99;
  index:number=0;
  height=300;
  ratio:number=0;
  memeApi:MemeApi | undefined;
  constructor(private http:HttpClient){}
  bored = ()=>{
    this.http.get<BoredApi>("http://www.boredapi.com/api/activity/").subscribe((data)=>{
      this.activity = data.activity;
    })
  }

  memed = ()=>{
    this.http.get<response>("https://api.imgflip.com/get_memes").subscribe((res)=>{
      this.index = Math.floor(Math.random() * (this.MAX_MEME_COUNT + 1));
      this.memeApi= res.data.memes[this.index];
      console.log(this.memeApi);
       this.ratio = this.height/this.memeApi.height;
       this.memeApi.width = this.memeApi.width*this.ratio;
      ;})
  }
}
