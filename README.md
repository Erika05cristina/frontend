#  Plataforma de Gestión Educativa – Ingeniería de Software

Este proyecto permite gestionar una institución educativa con funciones académicas y financieras integradas. Incluye control de estudiantes, matrículas, rubros, comprobantes de venta, transacciones financieras, cuentas contables y planes de cuentas.

---

## Tecnologías

- **Backend**: Spring Boot 3, JPA (Hibernate), MySQL  
- **Frontend**: Angular 20 (Signals, Vite, Standalone Components)  
- **Base de datos**: MySQL  
- **Dependencias útiles**: Lombok, Swagger OpenAPI, Angular Material, RxJS

---

## Funcionalidades

### Académico
- CRUD de estudiantes
- Gestión de matrículas
- Relación de rubros con matrícula

### Financiero
- Gestión de rubros y montos
- Comprobantes de venta con múltiples rubros asociados
- Descarga de comprobantes en PDF
- Gestión de planes de cuentas y cuentas contables
- Transacciones financieras con cuentas asociadas

---

## 🔗 Relaciones entre entidades

| Entidad                | Relaciones                                                                 |
|------------------------|----------------------------------------------------------------------------|
| `Estudiante`           | ⇄ `Matricula`, ⇄ `ComprobanteVenta`                                       |
| `Matricula`            | ⇄ `Rubro`, ⇄ `Estudiante`                                                  |
| `Rubro`                | ⇄ `Matricula`, ⇄ `ComprobanteVenta`                                       |
| `ComprobanteVenta`     | ⇄ `Estudiante`, ⇄ `Rubro`                                                  |
| `CuentaContable`       | ⇄ `PlanCuenta`, ⇄ `TransaccionFinanciera`                                 |
| `PlanCuenta`           | ⇄ `CuentaContable`                                                         |
| `TransaccionFinanciera`| ⇄ `CuentaContable`, ⇄ `DiarioCaja`                                        |

---

## Estructura del Proyecto 
backend/
├── controller/
├── model/
├── repository/
├── services/
└── resources/

frontend/
├── app/
│   ├── components/
│   ├── services/
│   └── routes/
└── assets/

### Estado Actual del Proyecto

[x] Gestión de estudiantes y matrículas

[x] CRUD de rubros

[x] Gestión de comprobantes de venta y su relación con rubros

[x] Funcionalidad de descarga de comprobantes

[x] CRUD de cuentas contables y planes de cuenta

[x] Integración backend–frontend completa

[x] Validaciones y UI responsiva
