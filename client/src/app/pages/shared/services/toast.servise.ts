import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ToastService {

  show(text:string, colorText:string, colorBackground: string, ms:number) {
    const div: any = document.getElementById('toast')
    if(!div) return
    div.innerHTML = text;
    div.style.width = '200px'
    div.style.height = 'auto'
    div.style.opacity = '1'
    div.style.color = colorText
    div.style.backgroundColor = colorBackground
    setTimeout(()=>{
      div.style.width = '0'
      div.style.height = '0'
      div.style.opacity = '0'
    }, ms)
  }

}
