export const contractRentalModel = `
<div><strong>CONTRATO DE LOCA&Ccedil;&Atilde;O</strong></div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Os signat&aacute;rios deste instrumento, de um lado <strong>ROTINA IM&Oacute;VEIS LTDA</strong> qualifica&ccedil;&atilde;o imobili&aacute;ria sito a <strong>Avenida Cristiano Aires</strong>, <strong>110 - Centro</strong>, <strong>Catal&atilde;o-GO</strong>, <strong>Creci CJ-8015</strong>, neste ato representada por seu S&oacute;cio Propriet&aacute;rio o senhor <strong>PEDRO MEZENCIO FILHO</strong>, CPF: <strong>970.684.971-87</strong>, RG: <strong>4190276 DGPC/GO</strong>, CRECI: <strong>26218</strong>, e de outro lado <strong>{name}</strong>, <strong>{nationality}</strong>, <strong>{maritalStatus}</strong>, <strong>{profession}</strong>, RG n&ordm; <strong>{rg}</strong>, CPF <strong>{cpf}</strong>, residente nesta Cidade de <strong>{address}</strong>, Tel: <strong>{phone}</strong>, t&ecirc;m justo e contratado o seguinte, que mutuamente aceitam e ortugam, a saber:</div>
<div>&nbsp;</div>
<div>O primeiro nomeado aqui chamado &ldquo;o locador&rdquo;, sendo propriet&aacute;rio de uma <strong>{type}</strong> sito a <strong>{propertyAddress}</strong>, loca-o ao segundo, aqui designado &ldquo;o locat&aacute;rio&rdquo;, mediante as cl&aacute;usulas e condi&ccedil;&otilde;es adiante estipuladas, ou seja:</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; (1&deg;) &ndash; O prazo de loca&ccedil;&atilde;o &eacute; de <strong>{duration}</strong> a partir de <strong>{startContract}</strong> a terminar em <strong>{endContract}</strong>, data em que o locat&aacute;rio se obriga a restituir o im&oacute;vel desocupado, no estado em que recebeu independente de Notifica&ccedil;&atilde;o ou Interpela&ccedil;&atilde;o Judicial, ressalvada a hip&oacute;tese de prorroga&ccedil;&atilde;o da loca&ccedil;&atilde;o, o que somente se far&aacute; por escrito.</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &pound; &uacute;nico: Caso o locat&aacute;rio n&atilde;o restitua o im&oacute;vel no fim do prazo contratual, pagar&aacute; enquanto estiver na posse do mesmo, o aluguel mensal reajustado nos termos da Cl&aacute;usula D&eacute;cima Oitava, at&eacute; a efetiva desocupa&ccedil;&atilde;o do im&oacute;vel objeto deste instrumento;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(2&deg;) &ndash; O aluguel mensal &eacute; de R$ <strong>{price}</strong>, que o locat&aacute;rio se compromete a pagar pontualmente, at&eacute; o dia <strong>{paymentLimit}</strong> de cada m&ecirc;s adiantadamente, na resid&ecirc;ncia do locador ou de seu representante;</div>
Parágrafo 1: Será acrescido ao valor total do aluguel a quantia de R$ 25,00, referente à taxa de boleto bancário e ao seguro residencial.
<div>&pound; primeiro:&nbsp; &nbsp;Dados para dep&oacute;sito do aluguel: <strong>Banco Bradesco</strong>, agencia <strong>1395</strong>, Conta Corrente: <strong>64159-6</strong>, <strong>Pedro Mezencio Filho</strong>, CPF: <strong>970.684.971-87</strong>, Chave Pix <strong>{pix}</strong></div>
<div>&pound; segundo: Em caso de mora no pagamento do aluguel, ser&aacute; aplicada multa de 5% (cinco por cento) sobre o valor devido e juros mensais de 1% (um por cento) do montante devido.</div>
<div>&pound; terceiro: LOCATÁRIO se compromete a depositar em favor do LOCADOR, a título de caução, a quantia de R$ <strong>{shorts}</strong>, a ser utilizada exclusivamente para a garantia das obrigações contratuais aqui estabelecidas. O valor da caução será devolvido ao LOCATÁRIO ao término do contrato de locação, deduzidas as eventuais pendências ou danos ao imóvel locado, conforme previsto em contrato.</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(3&deg;) &ndash; O locat&aacute;rio, salvo as obras que importem na seguran&ccedil;a do im&oacute;vel, obriga-se por todas as outras, devendo trazer o im&oacute;vel locado em boas condi&ccedil;&otilde;es de higiene e limpeza, com os aparelhos sanit&aacute;rios e de ilumina&ccedil;&atilde;o, pintura, telhados, vidra&ccedil;as, m&aacute;rmores, fechos, torneiras, pias, banheiros, ralos e demais acess&oacute;rios em perfeito estado de conserva&ccedil;&atilde;o e funcionamento, para assim, restitu&iacute;-los quando findo ou rescindido, este contrato sem direito a reten&ccedil;&atilde;o ou indeniza&ccedil;&atilde;o por quaisquer benfeitorias, ainda que necess&aacute;rias, as quais ficar&atilde;o desde logo incorporadas ao im&oacute;vel;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(4&deg;) &ndash; Obriga-se mais o locat&aacute;rio a satisfazer a todas as exig&ecirc;ncias dos Poderes P&uacute;blicos, a que der causa, e a n&atilde;o transferir este contrato, nem fazer modifica&ccedil;&otilde;es ou transforma&ccedil;&otilde;es no im&oacute;vel sem autoriza&ccedil;&atilde;o escrita do locador;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(5&deg;) &ndash; O locat&aacute;rio desde j&aacute; faculta ao locador examinar ou vistoriar o im&oacute;vel locado quando achar conveniente;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (6&deg;) &ndash; O locat&aacute;rio tamb&eacute;m n&atilde;o poder&aacute; sublocar nem emprestar o im&oacute;vel no todo ou em parte, sem preceder consentimento por escrito do locador; devendo, no caso deste ser dado, agir oportunamente junto aos ocupantes, a fim de que o im&oacute;vel esteja desimpedido no t&eacute;rmino do presente contrato;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (7&deg;) &ndash; No caso de desapropria&ccedil;&atilde;o do im&oacute;vel locado, ficara o locador desobrigado por todas as cl&aacute;usulas deste contrato, ressalvada ao locat&aacute;rio, t&atilde;o somente, a faculdade de haver do poder desapropriante a indeniza&ccedil;&atilde;o a que, por ventura, tiver direito;</div>
<div>&nbsp;</div>
<div>(8&deg;) &ndash; Nenhuma intima&ccedil;&atilde;o do Servi&ccedil;o Sanit&aacute;rio ser&aacute; motivo para o locat&aacute;rio abandonar o im&oacute;vel ou pedir a rescis&atilde;o deste contrato, salvo procedendo &agrave; vistoria judicial, que apure estar a constru&ccedil;&atilde;o amea&ccedil;ando ru&iacute;na;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(9&deg;) &ndash; Para todas as quest&otilde;es resultantes deste contrato, ser&aacute; competente o foro da situa&ccedil;&atilde;o do im&oacute;vel, seja qual for o domic&iacute;lio dos contratantes;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(10&deg;) &ndash; Tudo quanto for devido em raz&atilde;o deste contrato e que n&atilde;o comporte o processo executivo ser&aacute; cobrado em a&ccedil;&atilde;o competente, ficando a cargo do devedor, em qualquer caso, os honor&aacute;rios do advogado que o credor constituir para ressalva dos seus direitos;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (11&deg;) &ndash; No caso de morte, fal&ecirc;ncia ou insolv&ecirc;ncia do fiador, o locat&aacute;rio ser&aacute; obrigado dentro de 30 dias a dar substituto id&ocirc;neo, a ju&iacute;zo do locador, sob pena de incorrer na cl&aacute;usula seguinte;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp;(12&deg;) &ndash; Fica estipulada a multa de Um Aluguel Mensal na qual incorrer&aacute; a parte que infringir qualquer cl&aacute;usula deste contrato; com a faculdade, para a parte inocente, de poder considerar simultaneamente rescindida a loca&ccedil;&atilde;o, independente de qualquer formalidade;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp;(13&deg;) &ndash; Assina tamb&eacute;m o presente, solidariamente com o locat&aacute;rio por todas as obriga&ccedil;&otilde;es acima exaradas, o Senhor(a), {guarantor}, cuja responsabilidade, entretanto, perdurar&aacute; at&eacute; a entrega, real e efetiva das chaves do im&oacute;vel locado;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; (14&deg;) &ndash; Quaisquer estragos ocasionados ao im&oacute;vel e suas instala&ccedil;&otilde;es, bem como as despesas a que o propriet&aacute;rio for obrigado por eventuais modifica&ccedil;&otilde;es feitas no im&oacute;vel, pelo locat&aacute;rio, n&atilde;o ficam compreendidas na multa da cl&aacute;usula 12&deg;, mas ser&atilde;o pago &agrave; parte;&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; (15&deg;) &ndash; Em caso de falecimento de qualquer parte contratante, os herdeiros da parte falecida ser&atilde;o obrigados ao cumprimento integral deste contrato, at&eacute; a sua termina&ccedil;&atilde;o;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; &nbsp; (16&deg;) &ndash; Estabelecem as partes contratantes que, para reforma ou renova&ccedil;&atilde;o deste contrato, as partes interessadas se notificar&atilde;o mutuamente, com anteced&ecirc;ncia nunca inferior a cento e vinte dias, findo este prazo, considera-se como desinteressante para o locat&aacute;rio, a sua continua&ccedil;&atilde;o no im&oacute;vel ora locado, devendo o mesmo entregar as suas chaves ao locador, impreterivelmente no dia do vencimento deste contrato;&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (17&deg;) &ndash; O im&oacute;vel, objeto de loca&ccedil;&atilde;o, destina-se exclusivamente a resid&ecirc;ncia n&atilde;o podendo ser mudada a sua destina&ccedil;&atilde;o sem o consentimento expresso do locador;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (18&deg;) &ndash; Na hip&oacute;tese de ocorrer a prorroga&ccedil;&atilde;o desta loca&ccedil;&atilde;o, o aluguel mensal ser&aacute; reajustado de acordo com &iacute;ndice de reajustamento que ser&aacute; considerado oficial, de acordo com a legisla&ccedil;&atilde;o em vigor na &eacute;poca da eventual prorroga&ccedil;&atilde;o deste contrato. O locat&aacute;rio concorda, desde j&aacute;, com esse sistema de reajustamento do aluguel;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (19&deg;) &ndash; O locat&aacute;rio se obriga a pagar as despesas de telefone e de consumo de for&ccedil;a, luz e g&aacute;s, &aacute;gua e esgoto; e as despesas ordin&aacute;rias de condom&iacute;nio;</div>
<div>&nbsp;</div>
<div>&pound; &uacute;nico:&nbsp; &nbsp; &nbsp;O Locat&aacute;rio obriga-se a transferir a responsabilidade de pagamento das taxas de &aacute;gua (SAE) e energia (CELG), para o seu nome.</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp; (20&deg;) &ndash; A falta de pagamento, nas &eacute;pocas supradeterminadas, dos alugueis e encargos, por si constituir&aacute; o locat&aacute;rio em mora, independente de qualquer Notifica&ccedil;&atilde;o, Interpela&ccedil;&atilde;o ou aviso extrajudicial;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(21&deg;) &ndash; Se o locador admitir, em beneficio do locat&aacute;rio, qualquer atraso no pagamento do aluguel e demais despesas que lhe incumba, ou no cumprimento de qualquer outra obriga&ccedil;&atilde;o contratual, essa toler&acirc;ncia n&atilde;o poder&aacute; ser considerada como altera&ccedil;&atilde;o das condi&ccedil;&otilde;es deste contrato, nem dar&aacute; ensejo &agrave; invoca&ccedil;&atilde;o do Artigo 1.503 &ndash; inciso I do C&oacute;digo Civil Brasileiro, por parte do fiador, pois se constituir&aacute; em ato de mera liberdade do locador;</div>
<div>&nbsp;</div>
<div>&nbsp; &nbsp; &nbsp;(22&deg;) &ndash; O LOCATÁRIO declara receber o imóvel objeto deste contrato em perfeito estado de conservação e uso, com todas as suas instalações funcionando corretamente e com pintura nova em todos os cômodos. Compromete-se, por ocasião da entrega do imóvel ao término da locação, a restituí-lo nas mesmas condições em que o recebeu, salvo o desgaste natural pelo uso adequado do bem. O LOCATÁRIO se responsabiliza pela realização de pintura completa (interna e externa, porta envernizadas, pintura dos portões) e reparos necessários que se fizerem necessários para a devolução do imóvel nas condições acordadas, assim como pela manutenção periódica das instalações e funcionalidades do imóvel durante o período de locação;</div>
<div>&nbsp;</div>
<div>OBS.: O locat&aacute;rio se compromete a entregar o im&oacute;vel com todas as instala&ccedil;&otilde;es el&eacute;tricas e hidr&aacute;ulicas em perfeito estado de funcionamento, e as contas de &aacute;gua e luz pagas em dia.</div>
<div>&nbsp;</div>
<div>ANEXOS: LAUDO DE VISTORIA DO IM&Oacute;VEL E C&Oacute;PIA DOS DOCUMENTOS PESSOAIS.</div>
<div>E por assim terem contratado, assinam o presente, em Duas vias, em presen&ccedil;a das testemunhas abaixo:&nbsp;</div>
<div>&nbsp;</div>
<div>Catal&atilde;o, <strong>{signatureDate}</strong>.</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Locador: _________________________________________________________________________</div>
<div><strong>PEDRO MEZENCIO FILHO</strong></div>
<div>CPF: <strong>970.684.971-87</strong></div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Locat&aacute;ria: ________________________________________________________________________</div>
<div><strong>{name}</strong></div>
<div>CPF: <strong>{cpf}</strong></div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Fiador:___________________________________________________________________________</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Testemunha:______________________________________________________________________</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Testemunha:______________________________________________________________________</div>
`