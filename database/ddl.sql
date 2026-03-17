-- ============================================================
--  DDL – Base de datos: actividades_db
--  Motor: MySQL 8+
--  Tablas: proveedores, productos, usuarios, clientes
-- ============================================================

CREATE DATABASE IF NOT EXISTS actividades_db
  CHARACTER SET  utf8mb4
  COLLATE        utf8mb4_unicode_ci;

USE actividades_db;

-- ------------------------------------------------------------
-- 1. PROVEEDORES
--    Debe crearse antes que PRODUCTOS por la FK
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS proveedores (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nombre         VARCHAR(120)     NOT NULL,
  contacto       VARCHAR(100)         NULL,
  correo         VARCHAR(150)         NULL,
  telefono       VARCHAR(20)          NULL,
  direccion      VARCHAR(255)         NULL,
  activo         TINYINT(1)       NOT NULL DEFAULT 1,
  creado_en      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                           ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_proveedores   PRIMARY KEY (id),
  CONSTRAINT uq_prov_correo   UNIQUE      (correo)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
-- 2. PRODUCTOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nombre         VARCHAR(150)     NOT NULL,
  descripcion    TEXT                 NULL,
  precio         DECIMAL(10,2)    NOT NULL DEFAULT 0.00,
  stock          INT              NOT NULL DEFAULT 0,
  id_proveedor   INT UNSIGNED         NULL,
  activo         TINYINT(1)       NOT NULL DEFAULT 1,
  creado_en      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                           ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_productos             PRIMARY KEY (id),
  CONSTRAINT fk_producto_proveedor    FOREIGN KEY (id_proveedor)
      REFERENCES proveedores (id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

  CONSTRAINT chk_precio_positivo  CHECK (precio  >= 0),
  CONSTRAINT chk_stock_positivo   CHECK (stock   >= 0)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
-- 3. USUARIOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nombre         VARCHAR(100)     NOT NULL,
  correo         VARCHAR(150)     NOT NULL,
  password       VARCHAR(255)     NOT NULL  COMMENT 'Almacenar hash bcrypt',
  rol            ENUM('admin','user') NOT NULL DEFAULT 'user',
  activo         TINYINT(1)       NOT NULL DEFAULT 1,
  creado_en      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                           ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_usuarios    PRIMARY KEY (id),
  CONSTRAINT uq_usr_correo  UNIQUE      (correo)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
-- 4. CLIENTES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
  id             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nombre         VARCHAR(100)     NOT NULL,
  apellido       VARCHAR(100)     NOT NULL,
  correo         VARCHAR(150)         NULL,
  telefono       VARCHAR(20)          NULL,
  direccion      VARCHAR(255)         NULL,
  activo         TINYINT(1)       NOT NULL DEFAULT 1,
  creado_en      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                           ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_clientes    PRIMARY KEY (id),
  CONSTRAINT uq_cli_correo  UNIQUE      (correo)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
-- Índices de apoyo
-- ------------------------------------------------------------
CREATE INDEX idx_productos_proveedor  ON productos (id_proveedor);
CREATE INDEX idx_productos_activo     ON productos (activo);
CREATE INDEX idx_usuarios_activo      ON usuarios  (activo);
CREATE INDEX idx_clientes_activo      ON clientes  (activo);
CREATE INDEX idx_proveedores_activo   ON proveedores (activo);
