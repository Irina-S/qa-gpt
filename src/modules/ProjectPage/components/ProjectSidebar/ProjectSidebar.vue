<template>
  <v-navigation-drawer location="right" permanent>
    <v-list class="py-0">
      <v-list-item prepend-icon="mdi-file-tree-outline" title="Дерево проекта"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-title> Аналитика </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact" class="py-0">
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл1.txt"
              class="px-0 text-caption"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл2.doc"
              class="px-0 text-caption"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл3.jpeg"
              class="px-0 text-caption"
            ></v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title> Макеты </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact" class="py-0">
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл1.txt"
              class="px-0 text-caption"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл2.doc"
              class="px-0 text-caption"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-file"
              title="Файл3.jpeg"
              class="px-0 text-caption"
            ></v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <v-list class="py-0">
      <v-list-item prepend-icon="mdi-check-circle-outline" title="Чеклист проекта"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-checkbox label="Есть макеты?" hide-details density="comfortable" class="px-4"></v-checkbox>
    <v-checkbox
      label="Есть аналитика?"
      hide-details
      density="comfortable"
      class="px-4"
    ></v-checkbox>
    <v-checkbox
      label="Есть примеры ТК?"
      hide-details
      density="comfortable"
      class="px-4"
    ></v-checkbox>
  </v-navigation-drawer>
</template>
