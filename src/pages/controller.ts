// src/pages/controller.ts
import { JsonController, Get, Put, Param, Body, Post, HttpCode, NotFoundError  } from 'routing-controllers'

import Page from './entity'

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    // @Get('/pages/:id')
    // getPage(
    //     @Param('id') id: number
    // ): Page {
    //     return pagesById[id]
    // }

    @Get('/pages/:id')
      getPage(
        @Param('id') id: number
      ) {
        return Page.findOneById(id)
      }

      @Get('/pages')
        async allPages() {
        const pages = await Page.find()
        return { pages }
      }

      @Put('/pages/:id')
      async updatePage(
          @Param('id') id: number,
          @Body() update: Partial<Page>
      ) {
        const page = await Page.findOneById(id)
        if (!page) throw new NotFoundError('Cannot find page')

        return Page.merge(page, update).save()
      }

      @Post('/pages')
      @HttpCode(201)
      createPage(
        // as page arg is typed Page class is looked up for validation.
        @Body() page: Page
      ) {
        return page.save() // Save sends it to the DB
      }
}
