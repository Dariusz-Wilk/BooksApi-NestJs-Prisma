import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAllBooks(): any {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  async getBookById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getBookById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  @Delete('/:id')
  async deleteBookById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getBookById(id)))
      throw new NotFoundException('Book not found');

    await this.booksService.deleteBookById(id);
    return { success: true };
  }

  @Post('/')
  async addNewBook(@Body() bookData: CreateBookDTO) {
    return this.booksService.addNewBook(bookData);
  }

  @Put('/:id')
  async updateBookById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getBookById(id)))
      throw new NotFoundException('Book for update not found');
    await this.booksService.updateBookById(id, bookData);
    return { succes: true };
  }
}
