import { Categoria } from './../categoria.models';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {
  
  categorias: Categoria[] = [];
  
  constructor(private service: CategoriaService) { }
  
  ngOnInit(): void {
    this.findAll()
  }
  
  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.categorias = resposta;
    })
  }

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acao'];
  
}
