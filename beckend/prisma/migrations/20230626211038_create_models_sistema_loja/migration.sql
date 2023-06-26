-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_tamanho_id_fkey" FOREIGN KEY ("tamanho_id") REFERENCES "produto_tamanhos_estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
