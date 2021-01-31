import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor


class IITDSpider(CrawlSpider):
    name = "iitd"

    allowed_domains = [
        'iitd.ac.in',
        'iitd.ernet.in'
    ]

    rules = [
        Rule(LinkExtractor(), follow=True, callback='parse_item')
    ]

    start_urls = [
        'http://iitd.ac.in'
    ]

    def parse_item(self, response):
        # page = response.url.split("/")[-2]
        # filename = f'quotes-{page}.html'
        # with open(filename, 'wb') as f:
        #     f.write(response.body)
        self.logger.info(f'Visited URL {response.url}')
        return {
            'url': response.url,
            'status': response.status,
            'body': response.body,
            'request_meta': response.request.meta
        }
