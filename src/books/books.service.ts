import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  public getAllBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany({ include: { author: true } });
  }

  public getBookById(id: Book['id']): Promise<Book | null> {
    return this.prismaService.book.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  public deleteBookById(id: Book['id']): Promise<Book> {
    return this.prismaService.book.delete({ where: { id } });
  }

  public addNewBook(
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    return this.prismaService.book.create({ data: bookData });
  }

  public updateBookById(
    id: Book['id'],
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    return this.prismaService.book.update({ where: { id }, data: bookData });
  }
}
