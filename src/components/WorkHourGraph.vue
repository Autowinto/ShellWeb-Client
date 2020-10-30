<template>
  <div class="row">
    <div class="col">
      <div class="card shadow mb-4">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h6 class="text-primary font-weight-bold m-0">
            Registered Hours Overview
          </h6>
          <div class="dropdown no-arrow">
            <button
              class="btn btn-link btn-sm dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              type="button"
            >
              <i class="fas fa-ellipsis-v text-gray-400"></i>
            </button>
            <div
              class="dropdown-menu shadow dropdown-menu-right animated--fade-in"
              role="menu"
            >
              <p class="text-center dropdown-header">Time Basis:</p>
              <a class="dropdown-item" role="presentation" href="#"
                >&nbsp;Daily</a
              >
              <a class="dropdown-item" role="presentation" href="#"
                >&nbsp;Weekly</a
              >
              <a class="dropdown-item" role="presentation" href="#"
                >&nbsp;Monthly</a
              >
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-area">
            <canvas id="bar-chart-horizontal"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
}
</script>

<style>
</style>