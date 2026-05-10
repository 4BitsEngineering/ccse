# Bootstrap del repo CCSE

> Comandos para arrancar el repo Next.js sobre la estructura de planificación que ya está en el repo. Pensado para PowerShell (Windows). En macOS/Linux funcionan igual cambiando `$env:` por `export`.

## Prerrequisitos

- Node.js 20+ (`node -v`).
- Cuenta en Vercel y CLI: `npm i -g vercel`.
- Cuenta en Clerk con un proyecto creado.
- Cuenta en Stripe en modo test.
- Repo `4BitsEngineering/ccse` creado en GitHub (vacío o con este `README.md`).

## 1. Inicializar Next.js sin pisar la documentación existente

`create-next-app` crea archivos en raíz que pueden colisionar con `README.md`, `PROJECT.md`, `ROADMAP.md`. Estrategia: lo creamos en una subcarpeta temporal y movemos.

```powershell
npx create-next-app@latest .next-bootstrap --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Después, mover el contenido conservando la documentación que ya existe:

```powershell
# desde C:\Users\Nitropc\Desktop\CCSE
Get-ChildItem .next-bootstrap | Move-Item -Destination .
Remove-Item .next-bootstrap
```

> Si `create-next-app` propone sobreescribir un archivo que ya existe (por ejemplo `README.md`), responde **No**.

## 2. Reorganizar a `src/`

`create-next-app` con `--no-src-dir` deja `app/` en raíz. Lo movemos a `src/app` para que case con `docs/repo-structure.md`:

```powershell
New-Item -ItemType Directory -Force src
Move-Item app src\
```

Actualizar `tsconfig.json` para que `@/*` apunte a `./src/*` (debería estar ya).

## 3. Dependencias

```powershell
npm install zod react-markdown remark-gfm clsx tailwind-merge
npm install @clerk/nextjs stripe
npm install -D @types/node
```

## 4. shadcn/ui

```powershell
npx shadcn@latest init
# elegir: TypeScript, default style, slate base color, src/components/ui
npx shadcn@latest add button card dialog input label progress separator tabs toast tooltip
```

## 5. Variables de entorno

Crear `.env.local`:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...

# Sync de contenido
CCSE_CONTENT_SOURCE=C:/Users/Nitropc/Desktop/OPOSICIONES/CCSE_Nacionalidad_Espanola
```

## 6. Script de sync de contenido

Crear `scripts/sync-content.ts` (la implementación entra en Sprint 0). El comando que documentamos:

```powershell
npm run sync-content
# Con override de path:
$env:CCSE_CONTENT_SOURCE = "ruta\al\repo\oposiciones\CCSE_Nacionalidad_Espanola"; npm run sync-content
```

Añadir a `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "npm run sync-content && next build",
    "start": "next start",
    "lint": "next lint",
    "sync-content": "tsx scripts/sync-content.ts"
  }
}
```

`build` corre `sync-content` antes para asegurar que Vercel siempre construye con la versión última del JSON. **Nota**: en Vercel no tenemos acceso al repo origen local; alternativa para producción: pre-commit del contenido a este repo y `sync-content` solo se ejecuta en local. El `build` de Vercel solo correría `next build`. Refinar antes de Sprint 0.

## 7. Conexión a Vercel

```powershell
vercel link
vercel env pull .env.local
```

Configurar variables en el dashboard de Vercel para `production`.

## 8. Primer deploy

```powershell
git add .
git commit -m "chore: bootstrap Next.js, Tailwind, shadcn, Clerk, Stripe"
git push -u origin main
```

Vercel detecta el push y despliega. Verificar que `https://ccse-XXX.vercel.app` carga la página por defecto de Next.js.

## 9. Smoke test del JSON

Crear `src/lib/content.ts` con el cargador Zod del JSON. En `src/app/page.tsx`, renderizar la primera pregunta del banco como prueba. Si arranca y se ve, Sprint 0 cumplido.
