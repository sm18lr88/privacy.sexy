import { describe, it, expect } from 'vitest';
import { STDERR_IGNORE_PATTERNS } from '@tests/checks/desktop-runtime-errors/check-desktop-runtime-errors/app/error-ignore-patterns';

describe('desktop stderr ignore patterns', () => {
  it('recognizes the transient command-buffer failure with the Chromium source path', () => {
    // arrange
    const stderr = '[46339:0914/130805.595320:ERROR:gpu/ipc/client/command_buffer_proxy_impl.cc:285] '
      + 'ContextResult::kTransientFailure: Failed to send GpuControl.CreateCommandBuffer.';
    // act
    const ignored = STDERR_IGNORE_PATTERNS.some((pattern) => pattern.test(stderr));
    // assert
    expect(ignored).to.equal(true);
  });

  it('keeps unrelated command-buffer errors visible', () => {
    // arrange
    const stderr = '[46339:0914/130805.595320:ERROR:gpu/ipc/client/command_buffer_proxy_impl.cc:285] '
      + 'ContextResult::kFatalFailure: Failed to send GpuControl.CreateCommandBuffer.';
    // act
    const ignored = STDERR_IGNORE_PATTERNS.some((pattern) => pattern.test(stderr));
    // assert
    expect(ignored).to.equal(false);
  });
});
