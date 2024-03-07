import {
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAllAuthors(): any {
    return this.authorsService.getAllAuthors();
  }

  @Get('/:id')
  async getAuthorsById(@Param('id', new ParseUUIDPipe()) id: string) {
    const author = await this.authorsService.getAuthorsById(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() authorData: CreateAuthorDTO) {
    return this.authorsService.create(authorData);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateData: UpdateAuthorDTO,
  ) {
    if (!(await this.authorsService.getAuthorsById(id)))
      throw new NotFoundException('Author not found');

    await this.authorsService.updateAuthorById(id, updateData);
    return { succes: true };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.authorsService.getAuthorsById(id)))
      throw new NotFoundException('Author not found');

    await this.authorsService.deleteAuthorById(id);
    return { success: true };
  }
}
