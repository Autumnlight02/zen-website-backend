import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { addDownload } from 'util/db';
import { getAllThemes, getThemeFromId } from 'util/themeUtils';

const routes: FastifyPluginAsync = async (server) => {
  server.get('/', {
    schema: {
      response: {
        200: Type.Object({
          hello: Type.String(),
        }),
      },
    },
  }, async function () {
    return { hello: 'world' };
  });

  server.get('/theme/:id', async function (request, response) {
    const { id } = request.params as { id: string }
    console.log(id)
    return getThemeFromId(id)
  });
  server.get('/themes', async function (request, response) {
    return getAllThemes()
  });
  server.get("/addDownload/:platform", async function (request, response) {
    const { platform } = request.params as { platform: string }

    return addDownload(platform ?? undefined)
  });
}

export default routes;
